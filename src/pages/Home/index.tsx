import Guide from '@/components/Guide';
import {trim} from '@/utils/format';
import {PageContainer} from '@ant-design/pro-components';
import {useModel} from '@umijs/max';
import styles from './index.less';
import type React from "react";

const bigScreenURL = 'http://localhost:8080/#/'

const HomePage: React.FC = () => {
    const {name} = useModel('global');
    // @ts-ignore

    return (
        <PageContainer ghost>
            <div id="container">
                <iframe id="iframe-page" src={bigScreenURL} scrolling="no" frameBorder="0"/>
                {/*<Guide/>*/}
            </div>
        </PageContainer>
    );
};


function changeFrameHeight() {
    let ifm = document.getElementById("iframe-page")
    // @ts-ignore
    ifm.height = document.documentElement.clientHeight - 80;
    // @ts-ignore
    ifm.width = document.documentElement.clientWidth - 300;
}

window.onresize = function () {
    changeFrameHeight()
}



export default HomePage;
