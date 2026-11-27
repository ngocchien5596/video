"""Tạo ảnh AI cho các cảnh lớn (hướng C, series bible mục 3) bằng Stable Diffusion 1.5 chạy trên máy.

    node projects/doan-xem/tools/images.mjs 1 [--n 4] [--only thang-long]

Mỗi ảnh sinh n bản (seed khác nhau) vào out/doan-xem/anh-ai/ngay-XX/<tên>-<seed>.png để duyệt tay;
chọn bản ưng rồi chép sang public/doan-xem/ngay-XX/<tên>.png (video tự dùng).
GTX 16xx lỗi fp16 nên chạy fp32. Model tải về HF_HOME (mặc định D:/hf-cache, ổ C gần đầy).
"""
import argparse
import json
import os
from pathlib import Path

os.environ.setdefault("HF_HOME", "D:/hf-cache")

import torch  # noqa: E402
from diffusers import DPMSolverMultistepScheduler, StableDiffusionPipeline  # noqa: E402
from PIL import Image  # noqa: E402

MODEL = "stable-diffusion-v1-5/stable-diffusion-v1-5"
STYLE = (
    "Vietnamese ink wash painting on aged rice paper, loose brush strokes, visible paper texture, "
    "limited palette of ink black, ivory and cinnabar red, soft vignette, flat 2D illustration, no photorealism, "
)
NEGATIVE = "text, letters, calligraphy, watermark, signature, chinese characters, japanese clothing, photorealistic, photo, 3d render, blurry, deformed"
GEN = (640, 664)  # rộng, cao (bội số của 8), tỉ lệ gần 960×1000
OUT_SIZE = (960, 1000)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--jobs", required=True)
    ap.add_argument("--n", type=int, default=4)
    ap.add_argument("--steps", type=int, default=30)
    args = ap.parse_args()
    jobs = json.loads(Path(args.jobs).read_text(encoding="utf-8"))

    pipe = StableDiffusionPipeline.from_pretrained(MODEL, torch_dtype=torch.float32, variant="fp16", safety_checker=None, requires_safety_checker=False)
    pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config, use_karras_sigmas=True)
    pipe = pipe.to("cuda")
    pipe.enable_attention_slicing()

    for job in jobs:
        out_dir = Path(job["outDir"])
        out_dir.mkdir(parents=True, exist_ok=True)
        for k in range(args.n):
            seed = 1000 + k * 7919
            g = torch.Generator("cuda").manual_seed(seed)
            img = pipe(
                STYLE + job["prompt"],
                negative_prompt=NEGATIVE,
                width=GEN[0],
                height=GEN[1],
                num_inference_steps=args.steps,
                guidance_scale=7.5,
                generator=g,
            ).images[0]
            img = img.resize(OUT_SIZE, Image.LANCZOS)
            f = out_dir / f"{job['name']}-{seed}.png"
            img.save(f)
            print(f"  {f}", flush=True)


if __name__ == "__main__":
    main()
