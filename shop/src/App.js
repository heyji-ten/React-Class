import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

import Data from './data.js';
import Detail from './Detail.js';
import axios from 'axios';

import { Link, Route, Switch } from 'react-router-dom';

function App() {

  let [shoes, shoes변경] = useState(Data);
  let [재고, 재고변경] = useState([10,11,12]); //중요데이터는 App.js에 저장할것

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
  <Container fluid>
    <Navbar.Brand href="#">ShoeShop</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
        <NavDropdown title="Link" id="navbarScrollingDropdown">
          <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action5">
            Something else here
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#" disabled>
          Link
        </Nav.Link>
      </Nav>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>


<Switch>

  <Route exact path="/">
    <div className="background hei">
      <h1>20% Season off</h1>
      <p>
        This is a simple hero unit, a simple jumbotron-style component for calling
        extra attention to featured content or information.
      </p>
      <p>
        <Button variant="primary">Learn more</Button>
      </p>
    </div>

    <div className="container">
      <div className="row">
        {
          shoes.map((a,i)=>{
            return <Products shoes={shoes[i]} i={i} key={i} />
          })
        }
      </div>
      <button className='btn btn-primary' onClick={() => { 

        // axios.post('서버url',{ id : 'codingapple', pw : 1234 }); //서버에 데이터를 보내는 법

        // 로딩중이라는 UI 띄움

        axios.get('https://codingapple1.github.io/shop/data2.json') //새로고침 없이 데이터를 가져옴
        .then((result) => {

          // 로딩중이라는 UI 안보이게 처리

          console.log(result.data);
          shoes변경( [...shoes, ...result.data] ); //...연산자는 {}괄호를 벗겨줍니다. 카피본 만든것임.
        }) // 데이터 요청이 성공했을 때 실행함
        .catch(() => {
          // 로딩중이라는 UI 안보이게 처리

          console.log('실패')
        }) //데이터 요청이 실패했을 때 실행함

      }}>더보기</button>
    </div>
  </Route>

  <Route path="/detail/:id">
    <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}/>
  </Route>

  <Route path="/:id">
    <div>아무거나 적었을때 이거 보여줌</div>
  </Route>

</Switch>

{/* <Route path="/어쩌구" component={Modal}></Route> */}

    </div>
  );
}



function Products(props) {
  return (
    <div className="col-md-4">
      <img src={ 'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg' } width="100%"/>
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.content } & { props.shoes.price }</p>
    </div>
  )
}

export default App;
