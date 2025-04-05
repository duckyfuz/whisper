# Changelog

All notable changes to **Whisper** will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org) and follows the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format.

---

## [0.1.1] - 2025-04-04

### Added
- `snackbar.promise(...)` now returns the original promise, allowing `.then()` or `await` chaining.
- `snackbar.info`, `snackbar.success`, `snackbar.warning`, `snackbar.error`, and `snackbar(...)` now return the created snack's `id`.

### Changed
- Renamed `snackbar.clear()` to `snackbar.dismiss()` to better reflect its behavior and naming consistency.

### Breaking Changes
- ❗️`clear()` has been removed. Use `snackbar.dismiss(ids?: string[])` instead.
  - Pass an array of snack IDs to dismiss specific ones.
  - Call with no arguments to dismiss all active snacks.

---

## [0.1.0] - 2025-02-01

### Added
- Initial release of Whisper – a stackable, customizable snackbar (toast) component using TailwindCSS and Framer Motion.
- Supports snack types: `default`, `info`, `success`, `warning`, `error`.