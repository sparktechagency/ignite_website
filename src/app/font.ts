import localFont from 'next/font/local';
import {} from "../../public\assets\fonts\Syne-Bold.ttf"
const myCustomFont = localFont({
    src: [
        {
            path: '../public/fonts/MyCustomFont-Regular.ttf', 
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-my-custom', 
});

export default myCustomFont;