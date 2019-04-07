Generate three redux files from cli: 'constants.js, actions.js, reducers.js'

Install 

```
npm install -g redux-scaffolder
```

To generate constants, actions and reducers you can run:
```
# use -c or --con to read consts from "constatns.js" file
redux base 
# or 
redux b
```

Otherwise you can generate constants:
```
# -p or --path to specify path/ACTION_TYPE
redux const -p
# or
redux c
```

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
```

