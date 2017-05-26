# 12g

[![Greenkeeper badge](https://badges.greenkeeper.io/grrr-amsterdam/12g.svg)](https://greenkeeper.io/)

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
$ 12g env list -t [target environment name]
```
This will list the variables from the `.env` file on the target, without quotes or comments.


#### Current environment
```bash
$ 12g env name
```
This will print out the name of the current environment.
