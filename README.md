# 12g

[![Build Status](https://travis-ci.org/grrr-amsterdam/12g.svg)](https://travis-ci.org/grrr-amsterdam/12g)
[![Greenkeeper badge](https://badges.greenkeeper.io/grrr-amsterdam/12g.svg)](https://greenkeeper.io/)
[![Dependencies](https://david-dm.org/grrr-amsterdam/12g.svg)](https://david-dm.org/grrr-amsterdam/12g)

Administration tool for development and devops, according to the 12factor principles as applied by [Grrr](https://github.com/grrr-amsterdam)


## Install
```bash
$ npm install -g 12g
```


## Commands

### Display help
```bash
$ 12g -h [command] [subcommand]
```

### Environment
#### Create a template `.env` file
```bash
$ 12g env template
```
This will create a copy of your local `.env` file, named `.env.template`, with all values emptied.


#### List variables from a `.env` file
```bash
$ 12g env list -e [target environment name]
```
This will list the variables from the `.env` file on the target, without quotes or comments.
Target environment is probably `development`, `staging`, `production`, etcetera, depending on your setup.

If the targeted environment is remote, an SSH connection will be attempted, if Capistrano configuration can be found.


#### Current environment
```bash
$ 12g env name
```
This will print out the name of the current environment.

### Docker shortcut
Use `12g dock [command]` to execute a Docker command directly on your Docker Compose webserver.
It has to be running and it will have to adhere to the naming standards as we use them at
@grrr-amsterdam, which is basically calling your httpd service 'web'.

Examples:
```bash
$ 12g dock bash
$ 12g dock g spawn
$ 12g dock g snippet create
```


## Shorthand
You can use shorthand syntax in the provided argument for common environment names:

 * `p` becomes `production`
 * `s` becomes `staging`
 * `i` becomes `integration`
 * `d` becomes `development`
 * `t` becomes `testing`

For instance:
```bash
$ 12g env list -e s
```
To list the environment for `staging`.
