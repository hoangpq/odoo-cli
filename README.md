A simple CLI for creating Odoo modules.

### Installation

Prerequisites: [Node.js](https://nodejs.org/en/) (>=6.x, 8.x preferred), npm version 3+ and [Git](https://git-scm.com/).

``` bash
$ npm install -g odoo-cli
```

### Usage

``` bash
$ odoo module --name <module-name> --depends <module-list> --dist <directory>
```

Example:

``` bash
$ odoo module --name web_animation --depends web.core,web.Model,web.DataSet --dist .
```

### License

[MIT](http://opensource.org/licenses/MIT)
