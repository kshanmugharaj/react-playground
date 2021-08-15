# Context

## Observations,

1. All components under Context didn’t gets rerenderd.
2. Only the components uses the useContext hook and its children only got rerenderd.
3. But one other thing is in case if we need to just do an update ie we just need to call
   dispatch but still we got to access useContext hook so that component/its children also rerenders.
   Here we don’t need any state values.

Though rerenders doesn’t generally matters that much just a point to note. But this can be avoid with two Context
providers one for dispatch, other for mananging state (Need to test it though to 100% confirm).

4. So this still needs a reducer present in one place. If the state object is complex we need some immutable library to
   mange to make things easier.

5. Since this doesn’t have selector un-necessary renders will happen.
