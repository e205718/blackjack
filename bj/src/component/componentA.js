import { useNavigate } from "react-router-dom"

const ComponentA = () => {
    const navigate = useNavigate()
    return (
        <div>
            <p>ComponentA</p>
            <button onClick={() => navigate('/componentb')}>Test</button>
            <p>go</p>
            <button onClick={() => navigate('/je')}>お支払い</button>


            <a
            className="Bj"
            href="./blackjackjack/index.html"
            target="_blank"
            rel="noopener noreferrer"
            >
            blackJack
            </a>

            <button onClick={() => navigate('/Token')}>TOKEN</button>
            <button onClick={() => navigate('/Balance')}>bb</button>

        </div>

    )
}
export default ComponentA
