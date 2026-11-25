# AGENTS.md

## Local Preview (Jekyll)

This repository is a GitHub Pages blog built with Jekyll (`github-pages` + `mmistakes/minimal-mistakes` via `remote_theme`).

### Start the Local Server

```powershell
bundle exec jekyll serve
```

- Preview URL: `http://127.0.0.1:4000/`
- If `ruby` or `bundle` is not yet in `PATH` for the current shell session, prepend Ruby 3.1 first:

```powershell
$env:PATH = "C:\Ruby31-x64\bin;" + $env:PATH
bundle exec jekyll serve
```

### Build Only

```powershell
bundle exec jekyll build
```

### Environment Notes (Windows)

- **Ruby**: Installed at `C:\Ruby31-x64` (`RubyInstallerTeam.RubyWithDevKit.3.1`).
- **Gemfile**: Includes `tzinfo-data` (Windows timezone data) and `webrick` (required by `jekyll 3.9.2` on Ruby 3.1+).
- **Network**: `jekyll build` / `jekyll serve` requires network access to fetch `remote_theme` (`mmistakes/minimal-mistakes`).
