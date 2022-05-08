import React from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo.js";
import {
  Paper,
  List,
  Container,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import "./App.css";
import { call, signout } from "./service/ApiService";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
    };
  }
  //기존코드
  // componentDidMount() {
  //   const requestOptions = {
  //     method: "GET",
  //     headers: { "content-Type": "application/json" },
  //   };

  //   fetch("http://localhost:8080/todo", requestOptions)
  //     .then(response => response.json())
  //     .then(response => {
  //       this.setState({
  //         otems: response.data,
  //       });
  //     });
  // }
  // add = item => {
  //   const thisItems = this.state.items;
  //   item.id = "ID-" + thisItems.length; //key를 위한 id 추가
  //   item.done = false; //done 초기화
  //   thisItems.push(item); //리스트에 아이템 추가
  //   this.setState({ items: thisItems }); //업데이트는 반드시 this.setState로 해야 됨
  //   console.log("item:" + this.state.items);
  // };

  // delete = item => {
  //   const thisItems = this.state.items;
  //   console.log("Before Update Items:", this.state.items);
  //   const newItems = thisItems.filter(e => e.id !== item.id);
  //   this.setState({ items: newItems }, () => {
  //     //디버깅 콜백
  //     console.log("update Items:", this.state.items);
  //   });
  // };

  //call 함수로 간결
  componentDidMount() {
    call("/todo", "GET", null).then(response =>
      this.setState({ items: response.data, loading: false })
    );
  }

  add = item => {
    call("/todo", "POST", item).then(response =>
      this.setState({ items: response.data })
    );
  };

  delete = item => {
    call("/todo", "delete", item).then(response =>
      this.setState({ items: response.data })
    );
  };

  update = item => {
    call("/todo", "PUT", item).then(response =>
      this.setState({ items: response.data })
    );
  };

  render() {
    const todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo
              item={item}
              key={item.id}
              delete={this.delete}
              update={this.update}
            />
          ))}
        </List>
      </Paper>
    );

    //네이게이션 바
    var navigationBar = (
      <AppBar position='static'>
        <Toolbar>
          <Grid justify='space-beetween' container>
            <Grid item>
              <Typography variant='h6'>오늘의 할 일</Typography>
            </Grid>
            <Grid>
              <Button color='inherit' onClick={signout}>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );

    //로딩중이 아닐때 렌더링할 부분
    var todoListPage = (
      <div>
        {navigationBar}
        <Container maxWidth='md'>
          <AddTodo add={this.add} />
          <div className='TodoList'>{todoItems}</div>
        </Container>
      </div>
    );

    //로딩중일 때 렌더링할 부분
    var loadingPage = <h1>로딩중....</h1>;
    var content = loadingPage;

    if (!this.state.loading) {
      //로딩중이 아니면 todoListPage 선택
      content = todoListPage;
    }

    return <div className='App'>{content}</div>;
  }
}
export default App;
