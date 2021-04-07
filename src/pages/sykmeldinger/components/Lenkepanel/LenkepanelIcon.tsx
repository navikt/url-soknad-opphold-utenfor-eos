import React from 'react';
import { RegelStatus } from '../../../../models/Sykmelding/Behandlingsutfall';

interface Icon {
    hover?: boolean;
    width?: number;
}

const DeclinedIcon: React.FC<Icon> = ({ hover = false, width }) => {
    if (hover) {
        return (
            <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M23.3492 0L22.94 0.00399278C16.7911 0.111798 11.0035 2.59731 6.64541 7.00334C2.25534 11.4413 -0.102396 17.2508 0.00341263 23.3638C0.223016 36.0149 10.1351 45.925 22.5686 45.925L22.9739 45.921C35.8426 45.6994 46.134 35.2183 45.9124 22.5632C45.6928 9.91209 35.7808 0 23.3492 0ZM21.9597 11.9784C21.9597 11.4274 22.4069 10.9802 22.9579 10.9802C23.5069 10.9802 23.9561 11.4274 23.9561 11.9784V25.9531C23.9561 26.5041 23.5069 26.9513 22.9579 26.9513C22.4069 26.9513 21.9597 26.5041 21.9597 25.9531V11.9784ZM22.9939 34.9369C22.9819 34.9369 22.9699 34.9369 22.9579 34.9369C21.8699 34.9369 20.9795 34.0664 20.9615 32.9764C20.9416 31.8744 21.82 30.964 22.922 30.9461C22.934 30.9461 22.946 30.9441 22.9579 30.9441C24.046 30.9441 24.9344 31.8165 24.9543 32.9065C24.9743 34.0085 24.0939 34.9169 22.9939 34.9369Z"
                    fill="#0067C5"
                />
            </svg>
        );
    }
    return (
        <svg width="46" height="47" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.00341882 23.402C0.223419 36.078 10.1534 46.008 22.6094 46.008L23.0174 46.004C35.9074 45.778 46.2154 35.28 45.9954 22.602C45.7734 9.928 35.8474 0 23.3914 0L22.9814 0.004C16.8214 0.112 11.0214 2.6 6.65542 7.016C2.25942 11.458 -0.102581 17.28 0.00341882 23.402ZM23.0154 2.004L23.3914 2C34.7454 2 43.7934 11.064 43.9954 22.636C44.1954 34.212 34.7694 43.796 22.9814 44.004L22.6094 44.008C11.2554 44.008 2.20542 34.942 2.00342 23.368C1.90742 17.788 4.06342 12.48 8.07742 8.422C12.0754 4.38 17.3794 2.102 23.0154 2.004ZM22.9994 27C22.4474 27 21.9994 26.552 21.9994 26V12C21.9994 11.448 22.4474 11 22.9994 11C23.5514 11 23.9994 11.448 23.9994 12V26C23.9994 26.552 23.5514 27 22.9994 27ZM24.9994 33C24.9994 34.1046 24.104 35 22.9994 35C21.8948 35 20.9994 34.1046 20.9994 33C20.9994 31.8954 21.8948 31 22.9994 31C24.104 31 24.9994 31.8954 24.9994 33Z"
                fill="#3E3832"
            />
        </svg>
    );
};

const PapersykmeldingIcon: React.FC<Icon> = ({ hover = false, width }) => {
    if (hover) {
        return (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M35.57 31.822C35.396 31.942 35.2 32 35.002 32C34.684 32 34.374 31.85 34.18 31.57C33.864 31.114 33.976 30.492 34.432 30.178L46.776 21.634L40 16.974V1C40 0.45 39.552 0 39 0H9C8.45 0 8 0.45 8 1V16.974L1.328 21.562L13.578 30.182C14.028 30.5 14.136 31.124 13.82 31.576C13.626 31.854 13.314 32 13 32C12.8 32 12.602 31.942 12.426 31.818L0 23.074V44C0 46.206 1.796 48 4 48H44C46.208 48 48 46.206 48 44V23.216L35.57 31.822ZM10 26V2.00001H38V26H10ZM41 42C41.292 42 41.586 41.872 41.782 41.626C42.126 41.194 42.056 40.564 41.626 40.22L31.626 32.22C31.45 32.078 31.228 32 31 32H17C16.774 32 16.554 32.078 16.378 32.222L6.37799 40.222C5.94599 40.566 5.87599 41.194 6.22199 41.626C6.56599 42.058 7.19599 42.126 7.62599 41.782L17.352 34H30.65L40.376 41.782C40.56 41.93 40.782 42 41 42Z"
                    fill="#0067C5"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M33.1667 14.625C33.1667 13.3618 32.1391 12.3333 30.875 12.3333C29.6109 12.3333 28.5833 13.3618 28.5833 14.625C28.5833 15.7314 29.3717 16.6573 30.4167 16.8699V22.875C30.4167 23.6331 29.7998 24.25 29.0417 24.25C28.2836 24.25 27.6667 23.6331 27.6667 22.875V20.1259C27.6667 18.6088 26.4328 17.375 24.9167 17.375C23.4005 17.375 22.1667 18.6088 22.1667 20.125V24.7083C22.1667 25.4664 21.5498 26.0833 20.7917 26.0833C20.0336 26.0833 19.4167 25.4664 19.4167 24.7083V18.2688C21.9824 18.0359 24 15.8753 24 13.25V8.66667C24 7.56025 23.2117 6.63442 22.1667 6.42175V5.45833C22.1667 5.20533 21.9613 5 21.7083 5C20.9713 5 19.875 5.48858 19.875 6.83333C19.875 8.17808 20.9713 8.66667 21.7083 8.66667C21.9613 8.66667 22.1667 8.46133 22.1667 8.20833V7.376C22.6993 7.56575 23.0833 8.06992 23.0833 8.66667V13.25C23.0833 15.5243 21.2326 17.375 18.9583 17.375C16.6841 17.375 14.8333 15.5243 14.8333 13.25V8.66667C14.8333 8.06992 15.2174 7.56575 15.75 7.376V8.20833C15.75 8.46133 15.9553 8.66667 16.2083 8.66667C16.9453 8.66667 18.0417 8.17808 18.0417 6.83333C18.0417 5.48858 16.9453 5 16.2083 5C15.9553 5 15.75 5.20533 15.75 5.45833V6.42175C14.705 6.63442 13.9167 7.56025 13.9167 8.66667V13.25C13.9167 15.8753 15.9343 18.0359 18.5 18.2688V24.7083C18.5 25.9715 19.5276 27 20.7917 27C22.0558 27 23.0833 25.9715 23.0833 24.7083V20.125C23.0833 19.1139 23.9056 18.2917 24.9167 18.2917C25.9278 18.2917 26.75 19.1139 26.75 20.1259V22.875C26.75 24.1382 27.7776 25.1667 29.0417 25.1667C30.3058 25.1667 31.3333 24.1382 31.3333 22.875V16.8699C32.3783 16.6573 33.1667 15.7314 33.1667 14.625ZM21.25 7.64917C21.019 7.53917 20.7917 7.30908 20.7917 6.83333C20.7917 6.36033 21.0163 6.13025 21.25 6.01933V7.64917ZM16.6667 6.0175C16.8977 6.1275 17.125 6.35758 17.125 6.83333C17.125 7.30542 16.9013 7.5355 16.6667 7.64733V6.0175ZM30.875 16C30.1169 16 29.5 15.3831 29.5 14.625C29.5 13.8669 30.1169 13.25 30.875 13.25C31.6331 13.25 32.25 13.8669 32.25 14.625C32.25 15.3831 31.6331 16 30.875 16Z"
                    fill="#0067C5"
                />
            </svg>
        );
    }
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M38 27.7987V2H9.99999V27.7986L13.5541 30.168C14.0121 30.474 14.1381 31.096 13.8321 31.554C13.6381 31.844 13.3221 32 13.0001 32C12.8081 32 12.6161 31.946 12.4461 31.832L2 24.8679V44C2 45.104 2.896 46 4 46H44C45.104 46 46 45.104 46 44V24.868L35.554 31.832C35.384 31.946 35.192 32 35 32C34.678 32 34.362 31.844 34.168 31.554C33.862 31.096 33.986 30.474 34.446 30.168L38 27.7987ZM7.99999 26.4652V19.4007L2.78333 22.9874L7.99999 26.4652ZM7.99999 16.9744V1C7.99999 0.448 8.44799 0 8.99999 0H39C39.552 0 40 0.448 40 1V16.9744L47.5466 22.1627C47.6337 22.2196 47.7132 22.2911 47.7811 22.3763C47.8459 22.4572 47.8976 22.5474 47.9344 22.6439C47.9502 22.6852 47.9633 22.7277 47.9735 22.771C47.9909 22.8452 48 22.9219 48 23V44C48 46.206 46.206 48 44 48H4C1.794 48 0 46.206 0 44V23C0 22.67 0.162 22.364 0.434 22.176L7.99999 16.9744ZM40 19.4007V26.4653L45.2167 22.9875L40 19.4007ZM40.9999 42C40.7799 42 40.5599 41.928 40.3739 41.782L30.6479 34H17.3519L7.6259 41.782C7.1919 42.126 6.5659 42.058 6.2199 41.626C5.8759 41.194 5.9439 40.566 6.3759 40.22L16.3759 32.22C16.5519 32.078 16.7739 32 16.9999 32H30.9999C31.2259 32 31.4479 32.078 31.6259 32.218L41.6259 40.218C42.0579 40.564 42.1259 41.192 41.7819 41.624C41.5839 41.872 41.2919 42 40.9999 42Z"
                fill="#3E3832"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M33.1667 14.625C33.1667 13.3618 32.1391 12.3333 30.875 12.3333C29.6109 12.3333 28.5833 13.3618 28.5833 14.625C28.5833 15.7314 29.3717 16.6573 30.4167 16.8699V22.875C30.4167 23.6331 29.7998 24.25 29.0417 24.25C28.2836 24.25 27.6667 23.6331 27.6667 22.875V20.1259C27.6667 18.6088 26.4328 17.375 24.9167 17.375C23.4005 17.375 22.1667 18.6088 22.1667 20.125V24.7083C22.1667 25.4664 21.5498 26.0833 20.7917 26.0833C20.0336 26.0833 19.4167 25.4664 19.4167 24.7083V18.2688C21.9824 18.0359 24 15.8753 24 13.25V8.66667C24 7.56025 23.2117 6.63442 22.1667 6.42175V5.45833C22.1667 5.20533 21.9613 5 21.7083 5C20.9713 5 19.875 5.48858 19.875 6.83333C19.875 8.17808 20.9713 8.66667 21.7083 8.66667C21.9613 8.66667 22.1667 8.46133 22.1667 8.20833V7.376C22.6993 7.56575 23.0833 8.06992 23.0833 8.66667V13.25C23.0833 15.5243 21.2326 17.375 18.9583 17.375C16.6841 17.375 14.8333 15.5243 14.8333 13.25V8.66667C14.8333 8.06992 15.2174 7.56575 15.75 7.376V8.20833C15.75 8.46133 15.9553 8.66667 16.2083 8.66667C16.9453 8.66667 18.0417 8.17808 18.0417 6.83333C18.0417 5.48858 16.9453 5 16.2083 5C15.9553 5 15.75 5.20533 15.75 5.45833V6.42175C14.705 6.63442 13.9167 7.56025 13.9167 8.66667V13.25C13.9167 15.8753 15.9343 18.0359 18.5 18.2688V24.7083C18.5 25.9715 19.5276 27 20.7917 27C22.0558 27 23.0833 25.9715 23.0833 24.7083V20.125C23.0833 19.1139 23.9056 18.2917 24.9167 18.2917C25.9278 18.2917 26.75 19.1139 26.75 20.1259V22.875C26.75 24.1382 27.7776 25.1667 29.0417 25.1667C30.3058 25.1667 31.3333 24.1382 31.3333 22.875V16.8699C32.3783 16.6573 33.1667 15.7314 33.1667 14.625ZM21.25 7.64917C21.019 7.53917 20.7917 7.30908 20.7917 6.83333C20.7917 6.36033 21.0163 6.13025 21.25 6.01933V7.64917ZM16.6667 6.0175C16.8977 6.1275 17.125 6.35758 17.125 6.83333C17.125 7.30542 16.9013 7.5355 16.6667 7.64733V6.0175ZM30.875 16C30.1169 16 29.5 15.3831 29.5 14.625C29.5 13.8669 30.1169 13.25 30.875 13.25C31.6331 13.25 32.25 13.8669 32.25 14.625C32.25 15.3831 31.6331 16 30.875 16Z"
                fill="#3E3832"
            />
        </svg>
    );
};

const StethoscopeIcon: React.FC<Icon> = ({ hover = false, width }) => {
    if (hover) {
        return (
            <svg width="42" height="48" viewBox="0 0 42 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M37 16C34.2 16 32 18.2 32 21C32 23.4 33.8 25.4 36 25.8V39C36 40.6 34.6 42 33 42C31.4 42 30 40.6 30 39V33C30 29.6 27.4 27 24 27C20.6 27 18 29.6 18 33V43C18 44.6 16.6 46 15 46C13.4 46 12 44.6 12 43V29C17.6 28.4 22 23.8 22 18V8C22 5.6 20.2 3.6 18 3V1C18 0.4 17.6 0 17 0C15.4 0 13 1 13 4C13 7 15.4 8 17 8C17.6 8 18 7.6 18 7V5.2C19.2 5.6 20 6.8 20 8V18C20 23 16 27 11 27C6 27 2 23 2 18V8C2 6.6 2.8 5.6 4 5.2V7C4 7.6 4.4 8 5 8C6.6 8 9 7 9 4C9 1 6.6 0 5 0C4.4 0 4 0.4 4 1V3C1.8 3.6 0 5.6 0 8V18C0 23.8 4.4 28.4 10 29V43C10 45.8 12.2 48 15 48C17.8 48 20 45.8 20 43V33C20 30.8 21.8 29 24 29C26.2 29 28 30.8 28 33V39C28 41.8 30.2 44 33 44C35.8 44 38 41.8 38 39V25.8C40.2 25.4 42 23.4 42 21C42 18.2 39.8 16 37 16Z"
                    fill="#0067C5"
                />
            </svg>
        );
    }
    return (
        <svg width="42" height="48" viewBox="0 0 42 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M42 21C42 18.244 39.758 16 37 16C34.242 16 32 18.244 32 21C32 23.414 33.72 25.434 36 25.898V39C36 40.654 34.654 42 33 42C31.346 42 30 40.654 30 39V33.002C30 29.692 27.308 27 24 27C20.692 27 18 29.692 18 33V43C18 44.654 16.654 46 15 46C13.346 46 12 44.654 12 43V28.95C17.598 28.442 22 23.728 22 18V8C22 5.586 20.28 3.566 18 3.102V1C18 0.448 17.552 0 17 0C15.392 0 13 1.066 13 4C13 6.934 15.392 8 17 8C17.552 8 18 7.552 18 7V5.184C19.162 5.598 20 6.698 20 8V18C20 22.962 15.962 27 11 27C6.038 27 2 22.962 2 18V8C2 6.698 2.838 5.598 4 5.184V7C4 7.552 4.448 8 5 8C6.608 8 9 6.934 9 4C9 1.066 6.608 0 5 0C4.448 0 4 0.448 4 1V3.102C1.72 3.566 0 5.586 0 8V18C0 23.728 4.402 28.442 10 28.95V43C10 45.756 12.242 48 15 48C17.758 48 20 45.756 20 43V33C20 30.794 21.794 29 24 29C26.206 29 28 30.794 28 33.002V39C28 41.756 30.242 44 33 44C35.758 44 38 41.756 38 39V25.898C40.28 25.434 42 23.414 42 21ZM16 5.78C15.496 5.54 15 5.038 15 4C15 2.968 15.49 2.466 16 2.224V5.78ZM6 2.22C6.504 2.46 7 2.962 7 4C7 5.03 6.512 5.532 6 5.776V2.22ZM37 24C35.346 24 34 22.654 34 21C34 19.346 35.346 18 37 18C38.654 18 40 19.346 40 21C40 22.654 38.654 24 37 24Z"
                fill="#3E3832"
            />
        </svg>
    );
};

interface LenkepanelIconProps extends Icon {
    behandlingsutfall: keyof typeof RegelStatus;
    isPaper: boolean;
}

const LenkepanelIcon: React.FC<LenkepanelIconProps> = ({ behandlingsutfall, isPaper, hover = false, width }) => {
    if (behandlingsutfall === 'INVALID') {
        return <DeclinedIcon hover={hover} />;
    }
    if (isPaper) {
        return <PapersykmeldingIcon hover={hover} />;
    }
    return <StethoscopeIcon hover={hover} />;
};

export default LenkepanelIcon;
