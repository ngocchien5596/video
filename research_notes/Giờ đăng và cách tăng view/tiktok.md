# TikTok For You feed recommendations and upload best practices (2025–2026, Vietnam context)

Labels used throughout: **[OFFICIAL]** = TikTok's own pages (Newsroom, Support, Community Guidelines, Creator Academy). **[3P]** = third-party study or blog. **[INFERENCE]** = my reasoning, not a sourced fact. Research date: 2026-11-10. Note: several official tiktok.com pages (Support FAQ, Creator Academy articles) render client-side and could not be fetched in full. Where that happened, the official wording came through search snippets and is marked as such.

## 1. What TikTok officially says about For You recommendations

### Takeaway
TikTok officially names three signal groups: user interactions, video information, and device/account settings. Strong interest signals such as watching a longer video to the end count most. Device and locale settings count least. TikTok officially states that follower count and past viral videos are **not** direct factors.

### Cited Findings
- [OFFICIAL] The signals are (1) "user interactions": videos you like or share, accounts you follow, comments you post, content you create; (2) "video information": "captions, sounds, and hashtags"; (3) "device and account settings": language preference, country setting, device type — [TikTok Newsroom, "How TikTok recommends videos #ForYou" (June 18, 2020)](https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you)
- [OFFICIAL] Weighting: "A strong indicator of interest, such as whether a user finishes watching a longer video from beginning to end" gets more weight than weak indicators. Device and account settings get less weight because users do not actively state them as preferences — [TikTok Newsroom](https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you)
- [OFFICIAL] "neither follower count nor whether the account has had previous high-performing videos are direct factors" in the recommendation system. Bigger accounts may still get more views, but only because they already have a larger audience — [TikTok Newsroom](https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you)
- [OFFICIAL] The FYF is "powered by a recommendation system that helps connect you to content, creators, and topics you might enjoy." TikTok tries to avoid repeatedly recommending some topics: extreme fitness or dieting, sexual suggestiveness, sadness, and overgeneralized mental health advice. "If a video isn't getting many views, it also doesn't necessarily mean it broke a rule." Creators can see in analytics whether a video was made ineligible — [TikTok Community Guidelines, FYF Eligibility Standards](https://www.tiktok.com/community-guidelines/en/fyf-standards)
- [OFFICIAL] The Support page "How TikTok recommends content" now redirects to a JS-rendered page ([support FAQ](https://www.tiktok.com/support/faq_detail?id=7655285288050104852)) that could not be read. Its content could not be checked directly.

### Inferences
- [INFERENCE] The Newsroom article is from 2020, but it is still TikTok's canonical public description, and the 2025 Community Guidelines framing matches it. Watch-through and completion is the only signal TikTok publicly ranks as "strong". So retention is the main thing to optimize.
- [INFERENCE] "Not interested" is a user-side negative interaction under the same "user interactions" group. I found no fetched official text quantifying its weight.
- [INFERENCE] The "device/account settings: language, country" signal matters for Vietnamese content. Vietnamese-language videos will mainly be tested on users with Vietnamese language or Vietnam country settings. Cross-posting the same video to YouTube does not affect TikTok's view of it (no source either way).

### Gaps
- I could not read the current (2025–2026) Support "How TikTok recommends content" page text. Its explicit mention of rewatches, shares and "not interested" weighting is unverified.
- TikTok publishes no official numeric weights for likes, comments, shares or follows.

## 2. Videos ineligible for For You (FYF eligibility standards)

### Takeaway
"Allowed" and "recommended" are separate. Content can stay on the platform and still be FYF-ineligible. The official reason most relevant here is **"unoriginal or reused material without anything new."** Repeatedly posting FYF-ineligible content can make the whole account ineligible. Claims that QR codes or other-app watermarks trigger the flag come only from third parties.

### Cited Findings
- [OFFICIAL] "Content is also ineligible for the FYF if it includes unoriginal or reused material without anything new." Also FYF-ineligible: moderate-harm misinformation, content under fact-check review, content that tries to manipulate people into gifting or inflating likes or follows (engagement bait), and suspected paid political ads — [TikTok CG, Integrity & Authenticity](https://www.tiktok.com/community-guidelines/en/integrity-authenticity)
- [OFFICIAL] AI-generated or significantly edited realistic content must be labeled. "Unlabeled content may be removed, restricted, or labeled by our team, depending on the harm it could cause." Disclosure can be the AIGC label, or a caption, watermark or sticker of the creator's own — [TikTok CG, Integrity & Authenticity](https://www.tiktok.com/community-guidelines/en/integrity-authenticity)
- [OFFICIAL] Account restrictions "could include limiting your ability to post new content, appear in top search results, or in the FYF" — [TikTok CG, Integrity & Authenticity](https://www.tiktok.com/community-guidelines/en/integrity-authenticity)
- [OFFICIAL, via search snippet of the Sept 13, 2025 CG update] Repeatedly posting content that is allowed but FYF-ineligible "may lead to the account and its content being ineligible for recommendation." FYF-ineligible content may also be restricted from monetization. Ineligibility "will appear in the TikTok analytics tool" — [TikTok Community Guidelines (mirror)](https://proxy-dev.blitzz.co/proxy/123456/www.tiktok.com/community-guidelines); [ConductAtlas archive of FYF provision](https://conductatlas.com/platform/tiktok/tiktok-community-guidelines/for-you-feed-eligibility-exclusion/)
- [3P] After the Sept 2025 update, the FYF section "no longer has a long list" of ineligible content. The criteria are now spread across policy sections — (stated in search summary; related coverage at [Online Optimism](https://onlineoptimism.com/blog/updates-tiktoks-community-guidelines))
- [3P] TikTok Shop sellers were told that stricter enforcement on unoriginal content starts on 15 September 2025 — [BigSeller](https://www.bigseller.pro/blog/articleDetails/3778/tiktok-unoriginal-content.htm)
- [3P, unverified] Blogs claim the notification reads "Video ineligible for the For You feed" with reasons like unoriginal, low-quality or QR code, and that third-party watermarks (CapCut, Instagram Reels) trigger flags. Reposted slideshows can also lose reach — [OpenClip](https://openclip.app/guides/tiktok-slideshow-unoriginal-content-flag); [mainframee blog](https://mainframee.blogspot.com/2026/02/how-to-fix-not-eligible-for-for-you.html)

### Inferences
- [INFERENCE] For AI-voiced animated shorts the risk is the "unoriginal / reused" bucket, plus mass-produced, templated look-alike videos. Original scripts, original animation and a distinct series identity reduce that risk. Re-uploading clips from others, or near-duplicate uploads, raises it.
- [INFERENCE] Cross-posting to YouTube Shorts: export a clean master **without** a YouTube or CapCut-template watermark and upload the clean file to each platform. Do not download the TikTok version (TikTok watermark) for YouTube, or the reverse.
- [INFERENCE] Animated, non-photorealistic content probably does not fall under the "realistic AIGC" labeling rule. Using TikTok's AI-generated label or a caption disclosure for AI voices is still the low-risk choice.

### Gaps
- I could not read official text that names QR codes or third-party watermarks as FYF-ineligible in the 2025 CG. They appeared in older FYF lists (pre-2025) according to third parties, but that is unverified here.
- No official appeal procedure for FYF ineligibility was found in the fetched pages.

## 3. Ideal video length, hook, on-screen text, safe zones

### Takeaway
Official: hook within the first ~5 seconds, and use captions because >30% of surveyed users watch muted. Third-party data from 2025–2026 consistently shows longer videos (>60s, especially 1–3 min) getting more reach and views. Ultra-short 15–30s videos get a higher engagement *rate*. The Creator Rewards Program pays only on videos ≥1 minute, but it is not available in Vietnam.

### Cited Findings
- [OFFICIAL, Creator Academy via search snippet] "Consider having an attractive element early on in your video that sparks interest, ideally within the first 5 seconds." "Over 30% of TikTok survey respondents shared that they actually watch videos on mute, and rely on captions for context" — [TikTok Creator Academy, Elements of a TikTok video](https://www.tiktok.com/creator-academy/en/article/elements-of-tiktok-video?lang=en)
- [3P] Socialinsider, 8,000,795 organic brand TikToks, Jan–Jun 2026. Median views by length: 1–15s 1,274; 15–30s 1,000; 30–60s 2,200; 60–90s 7,200; 90–120s 9,620; **120–180s 11,136 (highest)**; >180s 10,150. Engagement rate by length: **15–30s 6.00% (highest)**; 0–15s 5.90%; 30–60s 4.20% (lowest); >180s 5.90%. Methodology caveat: the article's follower-range description is internally inconsistent — [Socialinsider](https://socialinsider.io/blog/how-long-are-tiktok-videos)
- [3P] Buffer (reported ~1.1M videos, 2025): ~86% of TikToks are under 1 min. Videos >60s reached at least 43.2% more people and got 63.8% more watch time. Buffer's own caveat: length "isn't necessarily the determining factor" — [NetInfluencer](https://www.netinfluencer.com/tiktok-longer-videos-outperform-short-form-content-study-reveals/); [The Star](https://thestar.com.my/tech/tech-news/2025/03/20/tiktok039s-ultra-short-videos-are-no-longer-the-biggest-draw-on-the-platform)
- [3P] Creator Rewards Program: 18+, ≥10,000 followers, ≥100,000 views in the last 30 days, and only original videos ≥1 minute earn. It is limited to selected countries (US, UK, DE, JP, KR, FR, BR listed). Vietnam is not listed — [AIR Media-Tech](https://air.io/en/new-monetization-for-tiktok-creators); [Metricool](https://metricool.com/tiktok-creator-fund/)
- [3P, unverified attribution] TikTok's ads creative guidance reportedly says to state the proposition in the first 3s and land the hook within the first 6s — [Zeely](https://zeely.ai/blog/hooks-for-tiktok-video-ads/)

### Inferences
- [INFERENCE] Longer videos collect more total watch time, but they only win if retention holds. For animated story shorts, a sensible test matrix is 20–35s (completion and rewatch play) against 60–120s (watch-time play, and it also fits YouTube Shorts' 3-minute cap). Compare them in your own analytics.
- [INFERENCE] Vietnam is not a CRP market, so the ">1 min for money" reason does not apply to a VN account. Choose length for retention, not monetization.
- [INFERENCE] Burn in Vietnamese subtitles (AI voices can be hard to parse) and keep them out of the bottom ~20% and right edge, where the caption and buttons overlay the video.

### Gaps
- I found no fetchable official TikTok safe-zone spec with pixel values. The Ads Manager safe-zone template exists, but it was not retrieved.
- There is no official TikTok statement on an "ideal length" for organic reach.

## 4. Caption, keywords / TikTok SEO, hashtags, sounds

### Takeaway
Official: captions, sounds and hashtags are "video information" the system reads, and Creator Academy recommends **2–3 relevant hashtags** ("less is more"). Third-party advice of 3–5 hashtags conflicts with this. Keywords spoken, on screen and in the caption support TikTok search, which agencies say Gen Z in Vietnam uses as a search engine (not quantified).

### Cited Findings
- [OFFICIAL] Captions, sounds and hashtags are recommendation inputs ("video information") — [TikTok Newsroom](https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you)
- [OFFICIAL, Creator Academy via search snippet] "When it comes to hashtags, less is more, so we encourage you to use 2 to 3 relevant hashtags on each video" — [TikTok Creator Academy](https://www.tiktok.com/creator-academy/en/article/elements-of-tiktok-video?lang=en)
- [3P] Gen Z and Millennials in Vietnam increasingly use TikTok as a search engine instead of Google (agency opinion, no survey data) — [Brands Vietnam / Ori Agency](https://www.brandsvietnam.com/congdong/topic/344328-tiktok-thay-the-google-tro-thanh-cong-cu-tim-kiem)
- [3P] Google Year in Search 2025 Vietnam: queries moved toward AI how-tos ("Cách làm video AI", "Tạo ảnh Gemini") — [VnEconomy](https://vneconomy.vn/google-cong-bo-10-xu-huong-tim-kiem-tai-viet-nam-trong-nam-2025.htm)
- [3P] Unlicensed music is cited as a common cause of FYF ineligibility or muting. Reposting copyrighted material without permission is a removal-level IP violation — [search summary of TikTok CG IP section](https://proxy-dev.blitzz.co/proxy/123456/www.tiktok.com/community-guidelines)

### Inferences
- [INFERENCE] Write captions in Vietnamese **with diacritics**, and put the main keyword phrase first (for example "truyện cổ tích hoạt hình …", "bài học cho bé …"). Say the same keyword in the first line of AI narration and show it as on-screen text. All three are readable "video information".
- [INFERENCE] Sounds: an AI-voiced original track becomes an "original sound". That is fine for originality. A low-volume trending sound under the voice can add a discovery path, but it raises copyright risk for business accounts, which are limited to the Commercial Music Library (not verified in this round).

### Gaps
- I found no official 2025–2026 page on TikTok SEO or keyword search ranking.
- The Commercial Music Library rules for business accounts were not fetched. I found no Buffer, Hootsuite or Sprout hashtag-count study with 2025 data.

## 5. Cover, playlists ("Danh sách phát"), pinned videos/comments, video replies

### Takeaway
Playlists suit episodic series. Third parties say they need about 10,000 followers and a Creator or Business account, with no official criteria published. I did not verify official details on covers, pins or video replies in this round.

### Cited Findings
- [3P] Creator playlists reportedly require about 10k followers. TikTok has "not officially released a criteria list". Possible blockers: account type, app version, region. Support may grant access — [Publer](https://publer.com/blog/tiktok-playlists/); [Social Champ](https://www.socialchamp.com/blog/how-to-make-a-playlist-on-tiktok/)
- [3P] Playlists help viewers who find one episode on FYP reach the next. Example: a 50-part storytelling series — [Vista Social](https://vistasocial.com/insights/how-to-make-playlists-on-tiktok/); [Captions.ai](https://www.captions.ai/blog-post/how-to-make-playlist-on-tiktok)

### Inferences
- [INFERENCE] Before reaching 10k: number episodes in the on-screen title and cover ("Tập 3"), say "Phần tiếp theo ở video ghim" (next part in the pinned video), and pin the episode 1 or best-performing episode. Covers mainly matter for profile-grid clicks and search results, not FYF, so use a consistent series template with large Vietnamese title text.

### Gaps
- Official current playlist eligibility, the pinned-video limit, and pinned-comment and reply-with-video behavior were not sourced in this round.

## 6. Posting frequency, consistency, delete/repost, early engagement

### Takeaway
"1–4 posts/day" is widely attributed to TikTok's creator guidance, but I could only confirm it secondhand. Third parties agree that consistency beats volume. I found no official statement on whether deleting and reposting helps or hurts. Repeated near-duplicate uploads risk the "unoriginal/reused" FYF rule.

### Cited Findings
- [3P, attribution to TikTok unverified] "TikTok's official guidance has historically recommended posting 1 to 4 times per day." Daily posting is not required to keep reach, but consistent posting helps — [Lilach Bullock](https://www.lilachbullock.com/how-many-times-a-day-should-you-post-on-tiktok/); [Mega Digital](https://megadigital.ai/en/blog/how-often-should-you-post-on-tiktok/); [Vizard](https://vizard.ai/blog/how-often-to-post-on-tiktok)
- [3P, unsourced] "TikTok's Creator Portal emphasizes schedule consistency over posting volume" (claims about a 5 posts/week threshold are unsourced) — [search results summary; see Hooked](https://www.hooked.so/blog/how-many-tiktoks-should-i-post-a-day)
- [OFFICIAL] Low views do not necessarily mean a rule was broken. Check analytics for ineligibility flags before deleting — [FYF Standards](https://www.tiktok.com/community-guidelines/en/fyf-standards)

### Inferences
- [INFERENCE] Deleting and reposting the same video is near-duplicate reuse. Given the official "unoriginal or reused material" clause and account-level ineligibility for repeated cases, avoid it. Make a recut with a new hook instead.
- [INFERENCE] Early engagement matters because each viewer's watch-through is the main signal. Replying to comments in the first hour adds comment activity (a user interaction signal), but its weight is not quantified officially.

### Gaps
- No direct fetch of a Creator Academy page with the "1–4 per day" wording.
- No official or third-party 2025 data on the effect of deleting and reposting.

## 7. TikTok Studio / Analytics metrics and benchmarks

### Takeaway
Watch: average watch time, watched full video % (completion), the retention curve, traffic source (share from For You), and new viewers. TikTok publishes no official benchmarks. Third-party thresholds conflict and are rough.

### Cited Findings
- [3P] "Watched full video" = completed views ÷ total views (attributed to TikTok One docs). Average watch time is a duration. The retention graph shows % remaining at each second — [TTCalculator](https://ttcalculator.net/learn/watch-time-metrics-explained/); [OnePeak FormatFinder](https://formatfinder.onepeakcreative.com/resources/how-to/analyze-your-tiktok-retention-curve)
- [3P, conflicting] Completion benchmarks: ">50% strong, 70%+ top tier" vs "40–60% for well-optimized content". Average watch time: ">50% of length excellent, 30–50% good, <30% needs work" — [Mega Digital](https://megadigital.ai/en/blog/tiktok-retention-rate/); [Swydo](https://www.swydo.com/blog/tiktok-metrics-organic/); [HEC Digital](https://digital.hec.ca/en/blog/tiktok-analytics-to-optimize-your-reach/)
- [3P] Check traffic source, especially the For You share, to see whether TikTok pushed the video to new viewers — [Post-Bridge](https://www.post-bridge.com/blog/tiktok-analytics)
- [OFFICIAL] FYF-ineligibility status appears in analytics — [FYF Standards](https://www.tiktok.com/community-guidelines/en/fyf-standards)

### Inferences
- [INFERENCE] Diagnose with the retention curve. A steep drop in 0–3s means a hook problem. Mid-video cliffs mean pacing. A rising tail or >100% average watch time means rewatches.

### Gaps
- There are no official TikTok benchmark values. I did not retrieve an official TikTok Studio help-page metric glossary.

## 8. Vietnam specifics

### Takeaway
Vietnam is one of TikTok's largest markets: 70M MAU per TikTok (Oct 2025) and 40.9M adult ad reach per DataReportal (Jan 2025). Agencies describe TikTok as a search tool for young Vietnamese, but no hard data was found. I found no TikTok Vietnam creator guidance specific to animation.

### Cited Findings
- [OFFICIAL via press] TikTok has more than 460M MAU in Southeast Asia, including 70M in Vietnam (Oct 2025) — [Tuoi Tre News](https://news.tuoitre.vn/tiktok-tops-460-million-monthly-active-users-in-southeast-asia-with-70-million-in-vietnam-103251029162827365.htm)
- [3P] DataReportal / Kepios Jan 2025: 40.9M TikTok ad reach aged 18+ in Vietnam, 55.6% of adults and 51.2% of internet users. This is ad audience only and excludes 13–17 — [DataReportal](https://datareportal.com/essential-tiktok-stats); [SmartAds summary of Digital 2025 Vietnam](https://smartads.tech/blog/detail/digital-insight-2025-vietnam-report-what-do-marketers-need-to-do-to-break-through--Fi4tFVBYd1NcWQ==.html)
- [3P] The top TikTok discovery category in Vietnam is fashion trends. 2025 VN TikTok marketing content is dominated by Shop and "shoppertainment" — [Brands Vietnam](https://www.brandsvietnam.com/congdong/topic/343710-tiktok-so-gang-voi-google-trong-dich-vu-quang-cao-tim-kiem); [Advertising Vietnam](https://advertisingvietnam.com/article/cap-nhat-xu-huong-tiep-thi-tiktok-2025-p25734)
- [3P] Vietnamese-language coverage of the length debate: "TikTok có đang ưu tiên video dài hơn?" — [Advertising Vietnam](https://advertisingvietnam.com/article/tiktok-co-dang-uu-tien-video-dai-hon-bat-mi-do-dai-toi-uu-de-tang-luot-xem-tren-tiktok-p26153)

### Inferences
- [INFERENCE] The 70M MAU and 40.9M 18+ ad reach gap suggests many under-18 and non-ad-addressable users. Kids and family animation has a large audience, but a regulated one (see section 9).

### Gaps
- I found no reliable data on animation or kids-content category share in Vietnam, and no official TikTok Vietnam creator guide.

## 9. Under-13 / kids' content, Vietnam age rules, Family Pairing

### Takeaway
TikTok requires users to be 13+ outside the US under-13 experience, and it removes tens of millions of suspected under-13 accounts per quarter. Vietnam's Decree 147/2024 (effective Dec 25, 2024) requires parents or guardians to register accounts for under-16s, plus phone verification for all users. A 2025–2026 draft would bar under-16s from posting, commenting or reacting (adoption status unconfirmed). The kids-content audience on TikTok is therefore officially teens and adults (parents), not young children.

### Cited Findings
- [OFFICIAL, TikTok to US Senate, Jan 2024] TikTok uses an age gate plus technology, moderators and reports to remove suspected under-13 users. The US has a separate under-13 experience — [Senate Judiciary QFR responses](https://www.judiciary.senate.gov/download/2024-01-31-qfr-responses-chew?download=1)
- [3P citing TikTok data] About 23.9M accounts removed in Q4 2025 as suspected under-13. 41.8M were removed globally in H1 2024 — [Statista](https://www.statista.com/statistics/1308893/tiktok-accounts-removed-by-reason); [Türkiye Today](https://www.turkiyetoday.com/turkiye/tiktok-removes-15-3-million-videos-in-turkiye-for-violating-community-guidelines-120008)
- [3P] Family Pairing (since 2020) lets parents set screen-time limits, mute notifications, and control DMs and comments. Newer features let parents block specific accounts. Some features are permanently off by default for 13–15 — [CP24](https://cp24.com/world/from-family-pairing-to-screen-time-limits-tiktok-suggests-ways-to-keep-kids-safe-1.7005379); [Axios](https://www.axios.com/tiktok-beefs-up-parental-controls-over-teens-accounts-def600f5-b7d8-4261-ad28-f475303d8918.html)
- [OFFICIAL VN law, via press] Decree 147/2024/ND-CP: under-16 accounts must be registered with parent or guardian info. All social media users must verify with a Vietnamese phone number. Effective Dec 25, 2024 — [LawNet](https://lawnet.vn/thong-tin-phap-luat/en/thong-bao-van-ban-moi/vietnam-s-regulation-on-cases-where-children-under-16-years-of-age-register-social-network-accounts-using-parents-information-from-december-25-2024-173745.html); [Tuoi Tre News](https://tuoitrenews.vn/news/society/20241129/social-media-sites-required-to-authenticate-users-in-vietnam-via-phone-numbers-decree/83169.html); [KPMG](https://assets.kpmg.com/content/dam/kpmg/vn/pdf/Legal-Update/2025/02/decree-147-on-internet-services-en.pdf)
- [3P press] Draft proposal: ban under-16s from posting, commenting or reacting. Status unconfirmed — [The Next Web](https://thenextweb.com/news/vietnam-under-16-social-media-ban); [VietNamNet](https://vietnamnet.vn/en/vietnam-weighs-tighter-verification-for-social-media-and-game-accounts-2538732.html)

### Inferences
- [INFERENCE] Kids' animation does not have a "made for kids" mode on TikTok like YouTube's. Target parents and teens in captions ("cho bé", "bố mẹ nên cho con xem"). Comments and interaction from actual young children are both against TikTok's rules and restricted under VN law. Expect lower comment rates than adult-targeted content.
- [INFERENCE] The channel owner must be 18+ (or parent-registered) with a VN phone-verified account.

### Gaps
- I found no official TikTok policy on how kids' educational content is ranked or treated.
- TikTok's specific minimum-age implementation in Vietnam (13 vs 16 with parental registration) was not confirmed from TikTok's own pages.

---

### Upload-time checklist (synthesized; each item maps to a section above)
1. Clean, original master with no other-app watermark and no re-used clips (sec. 2, official "unoriginal" rule).
2. Hook in 0–3s, at most 5s (official: ≤5s). Vietnamese burned-in captions, because >30% watch muted (official) (sec. 3).
3. Test lengths 20–35s vs 60–120s and judge by your own completion and average watch time (3P data) (sec. 3, 7).
4. Caption: Vietnamese keyword phrase with diacritics first, plus 2–3 relevant hashtags (official). Disclose AI if realistic (official) (sec. 2, 4).
5. Series: "Tập N" on the cover and on screen, a playlist once eligible (~10k, 3P), and pin episode 1 (sec. 5).
6. Post consistently (≈1/day is a reasonable starting point; "1–4/day" is attributed, not verified). Never delete and reupload identical files (sec. 6).
7. After 24–72h, check the retention curve, the For You traffic share, and any ineligibility flag in analytics (sec. 7).
