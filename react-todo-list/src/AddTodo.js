import React from "react";
import { TextField, Paper, Button, Grid } from "@mui/material";

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: { title: "" } }; //사용자의 입력을 저장할 객체
    this.add = props.add; //props의 함수를 this.add에 연결
    console.log(this.add);
  }

  //함수 작성 (textField 입력값 저장)
  OnInputChacnge = e => {
    const thisItem = this.state.item;
    thisItem.title = e.target.value;
    this.setState({ item: thisItem }); //비동기? setState를 톨해 item 업데이트
    console.log(thisItem);
  };

  //함수 작성 ( 버튼 클릭)
  OnButtonClick = () => {
    this.add(this.state.item); //add 함수 사용
    this.setState({ item: { title: "" } });
    console.log(this.add);
  };

  //함수 작성 (엔터 키)
  enterKeyeventHandler = e => {
    if (e.key === "Enter") {
      this.OnButtonClick();
    }
  };
  render() {
    return (
      <Paper style={{ margin: 16, padding: 16 }}>
        <Grid container>
          <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
            <TextField
              placeholder='Add Todo here'
              fullWidth
              onChange={this.OnInputChacnge}
              onKeyPress={this.enterKeyeventHandler}
              value={this.state.item.title}
            />
          </Grid>
          <Grid xs={1} md={1} item>
            <Button
              fullWidth
              color='secondary'
              variant='outlined'
              onClick={this.OnButtonClick}
            >
              +
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default AddTodo;
