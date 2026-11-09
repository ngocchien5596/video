"""Nạp model OmniVoice từ repo Tao_giong_noi_local (chỉ dùng OmniVoice, giấy phép Apache 2.0)."""
from __future__ import annotations

import os
import sys
from pathlib import Path

os.environ.setdefault("HF_HUB_OFFLINE", "1")
os.environ.setdefault("HF_HUB_DISABLE_TELEMETRY", "1")
os.environ.setdefault("HF_HUB_DISABLE_SYMLINKS_WARNING", "1")


def load_model(tts_root: Path):
    import logging

    import torch

    logging.getLogger("transformers").setLevel(logging.ERROR)
    omni_dir = tts_root / "OmniVoice"
    model_dir = omni_dir / "modelOmniLocal"
    if not (model_dir / "model.safetensors").exists():
        sys.exit(f"Không thấy model OmniVoice tại {model_dir}")
    sys.path.insert(0, str(omni_dir))
    from omnivoice.models.omnivoice import OmniVoice  # type: ignore

    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Nạp OmniVoice ({device})...", flush=True)
    model = OmniVoice.from_pretrained(str(model_dir), dtype=torch.float32)
    return model.to(device)


def save_wav(path: Path, audio, sampling_rate: int) -> None:
    import numpy as np
    import soundfile as sf

    path.parent.mkdir(parents=True, exist_ok=True)
    sf.write(str(path), np.asarray(audio, dtype=np.float32), sampling_rate, subtype="PCM_16")
