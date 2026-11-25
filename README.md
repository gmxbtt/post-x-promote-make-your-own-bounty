# post-x-promote-make-your-own-bounty-01

[![make.fun competition](https://make.fun/badge/post-x-promote-make-your-own-bounty-01.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)
[![make.fun rank](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/gmxbtt/post-x-promote-make-your-own-bounty/rank.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)
[![make.fun reward](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/reward.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)

Entry for the [make.fun](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01) bounty **post-x-promote-make-your-own-bounty-01** ($250, 50 places).

## The entry

The entry is the X post itself: one post of Derr's own on X that quotes
make.fun's make-your-own-bounty post
(https://x.com/makefunai/status/2124915864336236646), with a photo of his
own attached, make.fun / @makefunai and his play code in its text.

The live post: https://x.com/kenneloutis0/status/2125191777066054054
(a quote of the make.fun post above, photo attached — verified 25 Nov 2026).

`POST.json` names that post. The house reads its replies, reposts and
quotes from X.

## How it works

`main.ts` (Node 22, standard library only, no network, no wall clock) does
exactly one thing: it copies `POST.json` from the repository root to
`/output/POST.json`, where the gate reads it. It first checks that
`POST.json` names a real post address (`https://x.com/...`, no placeholder)
and refuses to hand over an empty or placeholder file.

Run it locally:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Files

- `main.ts` — copies `POST.json` to the output directory.
- `POST.json` — the submitted post's address.
- `LICENSE` — MIT.

## License

MIT — see [LICENSE](LICENSE).
