# DevWright

Free, browser-only developer utilities. No backend, no build step, no sign-up — everything runs client-side, right in your browser.

**Live site**: https://dev-joohyun.github.io/devwright/

## Why DevWright

Most "online dev tools" sites bury simple utilities behind ads, trackers, and slow server round-trips. DevWright does the opposite: every tool is a self-contained static page that processes your input entirely on-device. Nothing you paste is ever sent anywhere.

## Tools

| Category | Tool | Description |
| --- | --- | --- |
| Format | [Code Formatter](code-formatter.html) | Format & minify JSON, HTML, JS, and CSS |
| Encode / Decode | [Base64 Tool](base64-tool.html) | Encode / decode Base64 |
| Encode / Decode | [URL Encoder](url-encoder.html) | Percent-encode / decode URLs |
| Encode / Decode | [JWT Decoder](jwt-decoder.html) | Inspect JWT header & payload |
| Generate | [Hash Generator](hash-generator.html) | MD5, SHA-1, SHA-256, SHA-384, SHA-512 |
| Generate | [UUID Generator](uuid-generator.html) | UUID v4 and ULID generation |
| Convert | [Unix Timestamp](unix-timestamp.html) | Timestamp ⇄ human-readable date |
| Convert | [Color Converter](color-converter.html) | HEX ⇄ RGB ⇄ HSL |
| Convert | [YAML ⇄ JSON](yaml-json.html) | Convert between YAML and JSON |
| Convert | [curl Converter](curl-converter.html) | Turn a `curl` command into Python, JS, Node, PHP, Go, Java, Ruby, C#, PowerShell, or Rust code |
| Test | [Regex Tester](regex-tester.html) | Test and debug regular expressions live |

## Features

- **100% client-side** — no data ever leaves your browser
- **Zero dependencies** — plain HTML/CSS/JS, no frameworks or build tooling (aside from a couple of CDN fonts/scripts)
- **4 languages** — English, 中文, 日本語, 한국어
- **Dark / light theme** and a collapsible sidebar, with preferences remembered via `localStorage`
- **SEO-friendly** — each tool ships its own intro, FAQ, and structured data (`SoftwareApplication` + `FAQPage` JSON-LD)

## Project structure

```
index.html              Homepage — categorized tool cards + search
*.html                  One self-contained page per tool
site.css / site.js      Shared design system & JS helpers (window.DevWrightSite)
robots.txt / sitemap.xml
404.html
```

`site.js` exposes a small shared API (theme toggle, sidebar toggle, language persistence, clipboard helper) that every tool page wires up. `code-formatter.html` is the one exception, predating the shared stylesheet and keeping its own inline styles.

## Deployment

Hosted on **GitHub Pages**, served directly from the `master` branch — no CI/CD, no build pipeline. Push to `master` and the live site updates.

## Roadmap

- [ ] Privacy Policy / Terms of Service
- [ ] Google Search Console + sitemap submission
- [ ] Google Analytics (GA4)
- [ ] Google AdSense
- [ ] Custom domain

## License

TBD
