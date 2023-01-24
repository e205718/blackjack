import { useNavigate } from "react-router-dom"

const ComponentA = () => {
    const navigate = useNavigate()
    return (
        <div>
            <p>ComponentA</p>
            <button onClick={() => navigate('/componentb')}>Test</button>
            <p>go</p>
            <button onClick={() => navigate('/je')}>ログイン画面</button>


            <a
            className="Bj"
            href="./blackjackjack/index.html"
            target="_blank"
            rel="noopener noreferrer"
            >
            ゲームテストページ
            </a>

            <button onClick={() => navigate('/Token')}>TOKENテスト</button>
            <button onClick={() => navigate('/Balance')}>bbテスト</button>

        </div>

    )
}
export default ComponentA
