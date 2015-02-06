
# Archivr

Screencap. Scribble. Share.

## Development

### Legacy Team
  - __Product Owner__:
    - [Dan Tennery-Spalding](https://github.com/teachrdan)
  - __Scrum Master__:
    - [Christine Young](https://github.com/cyanCYMK)
  - __Development Team__: 
    - [Nick Sippl-Swezey](https://github.com/nsipplswezey)
    - [Tole Liberman](https://github.com/tliber)

### Greenfield Team
  - __Product Owner__:
    - Jackson Hoose
  - __Scrum Master__:
    - Andrew Smith
  - __Development Team__:
    - Ruben Vicario
    - Rick Wuebker

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Roadmap](#roadmap)
1. [Team](#team)
1. [Contributing](#contributing)


## Usage

- Take screenshots of websites.
- Scribble on yr screenshots.
- Share them with yr friends!


## Requirements

- Node
- npm
- Ruby
- Bundler
- MongoDB

## Development

### Installing Dependencies

From within the root directory:

```sh
gem install bundler
npm install
gem install
gulp build-development

# Run in separate tabs
mongod --dbpath server/db
nodemon server/index.js
```

__Known issues:__
  - There may be a conflict with different versions of SASS on your machine.
    - Run `$ gem uninstall sass` and delete the conflicting version.


### Roadmap

Start learning about the project by reading the [Wiki](https://github.com/MildHawk/Archivr/wiki).

View the project roadmap [here](https://waffle.io/fire-devil/archivr).


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
