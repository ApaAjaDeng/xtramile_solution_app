import { Route, Switch } from "react-router-dom";

import TodoList from "./TodoList";
import TodoDetail from "./TodoDetail";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={TodoList} />
      <Route exact path="/todo-detail/:id" component={TodoDetail} />
    </Switch>
  );
}

export default Routes;
