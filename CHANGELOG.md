# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v1.1.0

### Added

- Add `--devconsole` flag to show a link to the dev console in the output
  - This is a breaking change, as it used to be always shown. Now, it is
    only shown if the flag is passed, and not shown by default.
- Add a newline after starting logs, to make it easier to read

## v1.0.1

### Fixed

- Throw error if no command is specified

## v1.0.0

Initial release.
