import React from "react";
import {
  Button,
  TextField,
  Link,
  Grid,
  Container,
  Typography,
} from "@material-ui/core";

import { signup } from "./service/ApiService";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefalut();
    //오브젝트에서 form에 저장된 데이터를 맵의 형태로 바꿔줌
    const data = new FormData(event.target);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    signup({ email: email, username: username, password: password }).then(
      response => {
        //계정성공시 login페이지로 리디렉트
        window.location.href = "/login";
      }
    );
  }
  render() {
    return (
      <Container component='main' masWidth='xs' style={{ marginTop: "8%" }}>
        <form noValidate onSubmit={this.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component='h1' variant='h5'>
                계정생성
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete='fname'
                name='username'
                variant='outlined'
                fullWidth
                id='username'
                label='사용자 이름'
                autoFocus
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='이메일주소'
                name='email'
                autoComplete='email'
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='password'
                label='패스워드'
                name='password'
                autoComplete='currnet-password'
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
              >
                계정생성
              </Button>
            </Grid>
          </Grid>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/login' variant='budy2'>
                이미 계정이 있습니까? 로그인 하세요
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

export default Signup;
