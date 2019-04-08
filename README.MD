Generate three redux files from CLI: "constants.js, actions.js, reducers.js"

Install 

```
npm install -g redux-scaffolder
```

To generate constants, actions and reducers you can run:
```
# Then CLI will ask you to write your constants and generate files.
redux base 

# alias
redux b

# or use -r (--read) to read consts from "constants.js" file
redux b -r
```

[Example](https://github.com/shapkarin/redux-scaffolder/tree/master/example)
___

Otherwise you can generate constants.js:
```
# -p or --path to specify path/ACTION_TYPE
redux consts -p

# or
redux c
```

Then you can generate actions and reducers.
Tools will read constants from previous step.

Actions:
```
redux actions

# or
redux a
```

Reducer:
```
redux reducer REDUCER_NAME

# or
redux r REDUCER_NAME

# or leave name blank
redux r
```

