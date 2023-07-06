import { useContext } from "react";
import DataContext from "../data/DataContext";
import "../css/EstReciept.css";
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

const EstReciept = () => {
  const { state } = useContext(DataContext);
  const reciept = JSON.stringify(state.reciept);
  const [sessionReciept, setSessionReciept] = useState([]);
  const [resultData, setResultData] = useState({});
  const [searchParams] = useSearchParams();
  const estimate = searchParams.get("estimate");
  const date = new Date();

  // 리랜더 될 때마다 세션스토리지에 영수증 목록을 저장
  useEffect(() => {
    sessionStorage.setItem("sessionReciept", reciept);
  });

  // 세션스토리지에 저장된 영수증 목록을 빈 배열에 넣어줌
  useEffect((e) => {
    setSessionReciept(
      JSON.parse(window.sessionStorage.getItem("sessionReciept"))
    );
  }, []);

  // searchParams로 가져온 주소값과 state값 비교
  // 결과 업체를 찾음
  useEffect(() => {
    const result = state.score.find((s) => s.best === estimate);
    setResultData(result);
  });

  return (
    <motion.div
      initial={{
        opacity: 0,
        transform: "translateY(50px)",
        transition: "transform 0.33s ease",
      }}
      animate={{
        opacity: 1,
        transform: "translateY(20px)",
        transition: "transform 0.33s ease",
      }}
      exit={{
        opacity: 0,
        transform: "translateY(50px)",
        transition: "transform 0.33s ease",
      }}
      className="estreciept-wrapper"
    >
      <div className="estreciept-bar"></div>
      <div className="estreciept-receipt">
        <h1 className="estreciept-logo">Today Design</h1>
        <div className="estreciept-div">
          <div className="estreciept-line">사업장명: 투데이디자인</div>
          <div className="estreciept-line">사업자 등록번호: 123-45-678910</div>
          <div className="estreciept-line">주소: 부산광역시 중앙대로 749</div>
          <div class="estreciept-line">전화번호: 051-123-4567</div>
          <div className="estreciept-line">담당자: POS 102-1</div>
          <div className="estreciept-line">
            결제일시: {date.getFullYear()}-{date.getMonth() + 1}-
            {date.getDate()} {}
            {date.getHours()}:{date.getMinutes()}
          </div>
        </div>
        <div className="estreciept-break">************************</div>
        {state.reciept.map((r, i) => (
          <div className="estreiept-list" key={i}>
            <div className="estreciept-list-item">
              {i + 1} {r.name}
            </div>
            <div className="estreciept-list-item">{r.answer}</div>
          </div>
        ))}
        <div className="estreciept-break">************************</div>
        <div className="estreciept-result-div">
          {window.sessionStorage.getItem("result") == "null" ? (
            " "
          ) : (
            <span className="estreciept-company">{resultData.name}</span>
          )}
        </div>

        <div className="estreciept-barcode-div">
          <div className="estreciept-barcode">
            <img src={require("../img/barcode.png")} alt="" />
          </div>
          <div className="estreciept-barcodenum-div">
            <p className="estreciept-barcodenum">2023</p>
            <p className="estreciept-barcodenum">5018</p>
            <p className="estreciept-barcodenum">2205</p>
            <p className="estreciept-barcodenum">4812</p>
            <p className="estreciept-barcodenum">1224</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EstReciept;
