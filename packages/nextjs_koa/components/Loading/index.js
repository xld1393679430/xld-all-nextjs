import { Spin } from "antd";


export default () => (
    <div className="loading">
        <Spin />
        <style jsx>{`
            .loading{
                position: fixed;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                background-color: rgba(255, 255, 255, 0.3);
                z-index: 100001;
                display: flex;
                align-items: center;
                justify-content: center
            }
        `}</style>
    </div>
)