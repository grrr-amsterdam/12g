# 12g
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

### Environments
#### Create a template .env file
```bash
$ 12g env template
```
This will create a copy of the `.env` file, named `.env.template`, with all values emptied.
