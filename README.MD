Generate three redux files from CLI: 'constants.js, actions.js, reducers.js'

Install 

```
npm install -g redux-scaffolder
```

To generate constants, actions and reducers you can run:
```
redux base 

# or
redux b

# or use -r (--read) to read consts from "constants.js" file
redux b -c
```

___

Otherwise you can generate constants.js:
```
# -p or --path to specify path/ACTION_TYPE
redux const -p

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

