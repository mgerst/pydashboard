# PyDashboard
A Re-implementation of [Dashing](https://github.com/shopify/dashing) in Python
and React. Mostly to mess around with Flask, React, and Web Sockets.

## Setup
To setup PyDashboard install the node and python dependencies. You will also
need to do an initial webpack run using `npm run build` in order for flask to
not barf.

```
$ npm install
$ npm run build
$ pip install -r requirements.txt
```

To run in development use the following commands in separate terminals (or a
tmux session):

```
$ npm run dev
$ python app.py
```
