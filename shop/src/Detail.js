import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';

let 박스 = styled.div`
    padding : 20px;
`;

let 제목 = styled.h4`
    font-size : 25px;
    color : ${ props => props.색상 }
`;


// 예전 문법
// class Detail2 extends React.Component {

//     componentDidMount() {
            //컴포넌트 등장 되었을 때 실행할 코드
//     }

//     componentWillUnmount(){
            //컴포넌트 퇴장되기 직전에 실행할 코드
//     }
// }





function Detail(props){

    let [alert, alert변경] = useState(true);
    let [inputData, inputData변경] = useState('');

    useEffect(()=>{

        // axios.get(); //Detail 컴포넌트 등장할 때도 요청 가능함

        //컴포넌트가  mount 되었을때, update 될때 특정 코드를 실행할 수 있음
        
        //2초 후에 alert 창을 안보이게 해줘
        let 타이머 = setTimeout(()=>{ alert변경(false) }, 2000);
        return () => { clearTimeout(타이머) }

        //컴포넌트가 사라질 때 코드를 실행시킬 수 있음
        // return function 어쩌구(){ 실행할코드 } // return ()=>{} 가능
    }, []); // },[] <=실행조건 //  [alert] alert 라는 state가 업데이트 될 때만 실행됨 //[] 빈칸이면 다시 업데이트 될때 실행이 되지않음 = Detail 등장 시에만 실행되고 끝남


    let { id } = useParams();
    let history = useHistory();
    let 찾은상품 = props.shoes.find(function(상품){
        return 상품.id == id
    });

    return(
        <div className="container">
            <박스>
                <제목 className="red">Detail</제목>
            </박스>

            { inputData }
            <input onChange={(e) => { inputData변경(e.target.value) }}/>

            {
                alert === true
                ?   (<div className="my-alert2">
                        <p>재고가 얼마 남지 않았습니다.</p>
                    </div>)
                :   null
            }


            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}원</p>

                    <Info 재고={props.재고}></Info>

                    <button className="btn btn-danger" onClick={() => {
                        props.재고변경([9,10,11])
                    }}>주문하기</button> 
                    <button className="btn btn-danger" onClick={()=>{ 
                        history.goBack();
                    }}>뒤로가기</button> 
                </div>
            </div>
        </div> 
    )
}

//하위의 하위 props 하는 법

function Info(props){
    return (
        <p>재고 : {props.재고[0]}</p>
    )
}

export default Detail;