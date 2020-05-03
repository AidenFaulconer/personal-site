import React, { useState, useEffect, useCallback } from "react";
import { Link } from "gatsby";

// #region hardcoded SVGS (will be replaced by a proper inline svg loader when i find one)
export const navSvgs = {
  // main page
  main: `<svg width="51" height="51" viewBox="0 0 51 46" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4018 38.271C20.9541 38.271 21.4018 37.8232 21.4018 37.271V27.7897C21.4018 27.2374 21.8495 26.7897 22.4018 26.7897H28.8327C29.385 26.7897 29.8327 27.2374 29.8327 27.7897V37.271C29.8327 37.8232 30.2804 38.271 30.8327 38.271H39.3713C39.9236 38.271 40.3713 37.8232 40.3713 37.271V23.9626C40.3713 23.4103 40.819 22.9626 41.3713 22.9626H43.8902C44.8303 22.9626 45.2509 21.783 44.5229 21.1882L26.25 6.2576C25.8818 5.95676 25.3527 5.95676 24.9845 6.2576L6.71162 21.1882C5.98362 21.783 6.40424 22.9626 7.34435 22.9626H9.86321C10.4155 22.9626 10.8632 23.4103 10.8632 23.9626V37.271C10.8632 37.8232 11.3109 38.271 11.8632 38.271H20.4018Z" />
</svg>
`,
  projects: `<svg width="51" height="47" viewBox="0 0 51 47" xmlns="http://www.w3.org/2000/svg">
<path d="M42.479 11.9637H26.006C25.756 11.9637 25.515 11.87 25.3306 11.7011L21.6885 8.36524C21.5041 8.19634 21.2631 8.10266 21.0131 8.10266H8.75548C6.41591 8.10266 4.54004 9.82083 4.54004 11.9637V35.1301C4.54004 36.1541 4.98416 37.1361 5.77471 37.8602C6.56526 38.5843 7.63748 38.9911 8.75548 38.9911H42.479C44.7975 38.9911 46.6945 37.2536 46.6945 35.1301V15.8248C46.6945 13.7012 44.7975 11.9637 42.479 11.9637ZM39.1488 26.4427L32.6253 32.5575C32.2403 32.9185 31.641 32.918 31.2565 32.5565L24.7531 26.4427C23.9732 25.7091 23.5095 24.7438 23.5095 23.6434C23.5095 21.4619 25.4065 19.6858 27.725 19.6858C28.8632 19.6858 29.9381 20.1299 30.7179 20.8635L31.2588 21.3674C31.6428 21.7252 32.2381 21.7252 32.6221 21.3675L33.184 20.8441C33.9428 20.1299 35.0177 19.6858 36.1559 19.6858C38.4744 19.6858 40.3713 21.4619 40.3713 23.6434C40.3713 24.7245 39.9076 25.7284 39.1488 26.4427Z" />
</svg>
`,
  services: `<svg width="51" height="51" viewBox="0 0 51 49" xmlns="http://www.w3.org/2000/svg">
<path d="M44.5868 26.2035C45.8514 26.2035 46.9053 26.5998 47.5376 27.3926C48.3807 28.1853 48.8022 29.1761 48.8022 30.167L31.9404 36.1123L17.1864 32.1488V14.3129H21.191L36.5774 19.6636C37.6313 20.06 38.2636 20.8527 38.2636 21.8436C38.2636 22.4381 38.0528 23.0327 37.6313 23.429C37.2097 23.8254 36.5774 24.2217 35.7343 24.2217H29.8327L26.2496 22.8345L25.6173 24.6181L29.8327 26.2035H44.5868V26.2035ZM4.54004 14.3129H12.9709V36.1123H4.54004V14.3129Z" />
</svg>
`,
  skills: `<svg width="51" height="51" viewBox="0 0 52 50" xmlns="http://www.w3.org/2000/svg">
<path d="M10.9497 45.2031H40.6997C43.0436 45.2031 44.9497 43.3717 44.9497 41.1198V12.5364C44.9497 10.2845 43.0436 8.45308 40.6997 8.45308H36.4497V4.36975H32.1997V8.45308H19.4497V4.36975H15.1997V8.45308H10.9497C8.60583 8.45308 6.69971 10.2845 6.69971 12.5364V41.1198C6.69971 43.3717 8.60583 45.2031 10.9497 45.2031ZM23.6997 37.8817L15.8223 30.3132L18.8271 27.4263L23.6997 32.1078L32.8223 23.343L35.8271 26.2299L23.6997 37.8817ZM10.9497 14.5781H40.6997V18.6614H10.9497V14.5781Z" />
</svg>
`,
  about: `<svg width="51" height="51" viewBox="0 0 51 47" xmlns="http://www.w3.org/2000/svg">
<path d="M27.7255 6.17334C19.7794 6.17334 13.3719 11.8964 12.9714 19.0939L8.92459 24.0021C8.41873 24.6035 8.92459 25.5735 9.80983 25.5735H12.9714V31.3936C12.9714 33.547 14.8473 35.2736 17.1869 35.2736H19.2946V41.0937H34.0486V31.995C39.0439 29.8222 42.4795 25.1855 42.4795 19.7535C42.4795 12.265 35.9034 6.17334 27.7255 6.17334ZM36.1564 17.4836C36.1564 20.4713 33.2899 22.8575 28.948 26.4853L27.7255 27.5135L26.503 26.4853C22.1611 22.8575 19.2946 20.4713 19.2946 17.4836C19.2946 15.1556 21.318 13.235 23.8473 13.2156H23.9316C25.3859 13.2156 26.777 13.817 27.7255 14.8258C28.6739 13.817 30.065 13.2156 31.5194 13.2156C34.0486 13.1962 36.1564 15.078 36.1564 17.406V17.4836V17.4836Z" />
</svg>`,
  contact: `<svg width="51" height="51" viewBox="0 0 51 48" xmlns="http://www.w3.org/2000/svg">
<path d="M40.3715 6.15139H38.2638V2.2312H34.0483V6.15139H17.1866V2.2312H12.9711V6.15139H10.8634C9.74539 6.15139 8.67317 6.56441 7.88262 7.29959C7.09207 8.03477 6.64795 9.03188 6.64795 10.0716V37.5129C6.64795 38.5526 7.09207 39.5497 7.88262 40.2849C8.67317 41.0201 9.74539 41.4331 10.8634 41.4331H40.3715C42.69 41.4331 44.5869 39.669 44.5869 37.5129V10.0716C44.5869 7.91548 42.69 6.15139 40.3715 6.15139ZM25.6174 12.0317C29.1163 12.0317 31.9406 14.6582 31.9406 17.912C31.9406 21.1657 29.1163 23.7922 25.6174 23.7922C22.1186 23.7922 19.2943 21.1657 19.2943 17.912C19.2943 14.6582 22.1186 12.0317 25.6174 12.0317ZM38.2638 35.5528H12.9711V33.5927C12.9711 29.6725 21.402 27.5164 25.6174 27.5164C29.8329 27.5164 38.2638 29.6725 38.2638 33.5927V35.5528Z" />
</svg>`,
  // blog
  uiux: `<svg width="51" height="51" viewBox="0 0 24 26" xmlns="http://www.w3.org/2000/svg">
<path d="M15.9551 11.9172L17.4136 13.5042L15.596 15.4817C15.4614 15.6282 15.4614 15.7747 15.596 15.9211L15.9775 16.3362C16.1121 16.4827 16.2468 16.4827 16.3814 16.3362L18.199 14.3586L21.0038 17.4104L19.1863 19.3879C19.0516 19.5344 19.0516 19.6728 19.1863 19.803L19.5677 20.2424C19.7024 20.3889 19.837 20.3889 19.9716 20.2424L21.7892 18.2649L23.2029 19.803C23.3375 19.9495 23.4048 20.1285 23.4048 20.3401C23.4048 20.5517 23.3375 20.7389 23.2029 20.9016L19.6126 24.8079C19.463 24.9543 19.291 25.0276 19.0965 25.0276C18.902 25.0276 18.7375 24.9543 18.6029 24.8079L11.3551 16.9221L7.13652 21.512C6.89717 21.7724 6.60546 21.9026 6.26139 21.9026C5.91733 21.9026 5.62562 21.7724 5.38627 21.512L3.68091 19.6321C3.44156 19.3717 3.32188 19.0583 3.32188 18.6921C3.32188 18.3259 3.44156 18.0126 3.68091 17.7522L7.89944 13.1624L0.629197 5.2522C0.494563 5.10571 0.427246 4.92668 0.427246 4.71509C0.427246 4.5035 0.494563 4.32446 0.629197 4.17798L4.21944 0.247314C4.36904 0.10083 4.54107 0.0275879 4.73554 0.0275879C4.93001 0.0275879 5.09456 0.10083 5.2292 0.247314L6.64286 1.7854L4.8253 3.76294C4.69066 3.90942 4.69066 4.05591 4.8253 4.20239L5.20676 4.61743C5.34139 4.76392 5.47603 4.76392 5.61066 4.61743L7.42822 2.63989L10.2331 5.69165L8.41554 7.66919C8.28091 7.81567 8.28091 7.96216 8.41554 8.10864L8.797 8.52368C8.93164 8.67017 9.06627 8.67017 9.20091 8.52368L11.0185 6.54614L12.477 8.15747L19.5902 0.418213C19.8295 0.157796 20.1175 0.0275879 20.4541 0.0275879C20.7907 0.0275879 21.0786 0.157796 21.318 0.418213L23.0458 2.2981C23.2851 2.55851 23.4048 2.87183 23.4048 3.23804C23.4048 3.60425 23.2851 3.91756 23.0458 4.17798L15.9551 11.9172ZM1.90822 19.7542C1.93814 19.8844 1.9905 19.9902 2.0653 20.0715L4.98237 23.2454C5.05717 23.3267 5.1544 23.3837 5.27408 23.4163C5.19928 23.579 5.13944 23.6767 5.09456 23.7092L1.14529 25.0276C0.786271 25.0276 0.57684 24.995 0.517002 24.9299C0.457165 24.8648 0.427246 24.637 0.427246 24.2463L1.63895 19.9495C1.66887 19.9169 1.75863 19.8518 1.90822 19.7542Z"/>
</svg>
`,
  datascience: `<svg width="51" height="51" viewBox="0 0 24 27" xmlns="http://www.w3.org/2000/svg">
<path d="M24 4.09466V6.41608C24 8.46185 18.625 10.1304 12 10.1304C5.37498 10.1304 0 8.46185 0 6.41608V4.09466C0 2.04889 5.37498 0.380371 12 0.380371C18.625 0.380371 24 2.04889 24 4.09466ZM24 9.31787V14.5411C24 16.5869 18.625 18.2554 12 18.2554C5.37498 18.2554 0 16.5869 0 14.5411V9.31787C2.57812 11.0009 7.29686 11.7844 12 11.7844C16.7031 11.7844 21.4218 11.0009 24 9.31787ZM24 17.4429V22.6661C24 24.7119 18.625 26.3804 12 26.3804C5.37498 26.3804 0 24.7119 0 22.6661V17.4429C2.57812 19.1259 7.29686 19.9094 12 19.9094C16.7031 19.9094 21.4218 19.1259 24 17.4429Z" />
</svg>
`,
  workflow: `<svg width="51" height="51" viewBox="0 0 26 27"  xmlns="http://www.w3.org/2000/svg">
<path d="M12.7876 0.24292C5.83057 0.24292 0.193848 6.09644 0.193848 13.321C0.193848 20.5457 5.83057 26.3992 12.7876 26.3992C19.7446 26.3992 25.3813 20.5457 25.3813 13.321C25.3813 6.09644 19.7446 0.24292 12.7876 0.24292ZM17.4844 16.7488L16.4687 18.0671C16.4021 18.1537 16.3197 18.2257 16.2262 18.2792C16.1327 18.3326 16.03 18.3665 15.924 18.3787C15.8179 18.3909 15.7106 18.3814 15.6081 18.3505C15.5056 18.3197 15.41 18.2682 15.3267 18.199L11.9243 15.577C11.6866 15.3794 11.4947 15.1287 11.3628 14.8437C11.231 14.5586 11.1626 14.2464 11.1626 13.9301V5.72729C11.1626 5.50352 11.2482 5.28891 11.4006 5.13067C11.5529 4.97244 11.7596 4.88354 11.9751 4.88354H13.6001C13.8156 4.88354 14.0222 4.97244 14.1746 5.13067C14.327 5.28891 14.4126 5.50352 14.4126 5.72729V13.321L17.3579 15.5623C17.4413 15.6315 17.5107 15.7172 17.5622 15.8143C17.6136 15.9114 17.6462 16.0181 17.6579 16.1283C17.6697 16.2385 17.6604 16.35 17.6306 16.4565C17.6008 16.5629 17.5511 16.6623 17.4844 16.7488Z"  />
</svg>
`,
  "3d": `<svg width="51" height="51" viewBox="0 0 25 29" xmlns="http://www.w3.org/2000/svg">
<path d="M24.1655 7.99583V7.8825L24.0805 7.67C24.0509 7.62491 24.0177 7.58227 23.9813 7.5425C23.9434 7.48253 23.9008 7.42568 23.8538 7.3725L23.7263 7.27333L23.4996 7.16L12.8746 0.600835C12.6495 0.460114 12.3893 0.385498 12.1238 0.385498C11.8583 0.385498 11.5981 0.460114 11.373 0.600835L0.832969 7.16L0.705469 7.27333L0.577969 7.3725C0.531008 7.42568 0.488373 7.48253 0.450469 7.5425C0.414049 7.58227 0.380887 7.62491 0.351303 7.67L0.266302 7.8825V7.99583C0.252378 8.11822 0.252378 8.24179 0.266302 8.36417V20.7458C0.26582 20.9866 0.326703 21.2235 0.443203 21.4342C0.559703 21.6449 0.727976 21.8224 0.932136 21.95L11.5571 28.5092C11.6225 28.5496 11.6944 28.5783 11.7696 28.5942H11.883C12.1226 28.6702 12.38 28.6702 12.6196 28.5942H12.733C12.8082 28.5783 12.8801 28.5496 12.9455 28.5092L23.4996 21.95C23.7038 21.8224 23.8721 21.6449 23.9886 21.4342C24.1051 21.2235 24.1659 20.9866 24.1655 20.7458V8.36417C24.1794 8.24179 24.1794 8.11822 24.1655 7.99583ZM10.7496 24.7692L2.95797 19.9525V10.9142L10.7496 15.7167V24.7692ZM12.1663 13.2658L4.23297 8.36417L12.1663 3.47667L20.0996 8.36417L12.1663 13.2658ZM21.3746 19.9525L13.583 24.7692V15.7167L21.3746 10.9142V19.9525Z"/>
</svg>
`,
  ai: `<svg width="51" height="51" viewBox="0 0 26 27" xmlns="http://www.w3.org/2000/svg">
<path d="M23.2743 8.93388C23.4503 8.296 23.4884 7.62598 23.386 6.9712C23.2837 6.31641 23.0434 5.69287 22.682 5.14466C22.3207 4.59645 21.8473 4.13698 21.2951 3.79874C20.743 3.46049 20.1257 3.25174 19.4868 3.18725C19.2305 2.42726 18.7519 1.7684 18.1172 1.30187C17.4825 0.835338 16.7232 0.584213 15.9443 0.583252C15.0188 0.586491 14.1276 0.945648 13.4443 1.59075C12.7611 0.945648 11.8699 0.586491 10.9443 0.583252C9.31809 0.583252 7.93184 1.65663 7.41309 3.18596C6.77313 3.24884 6.1544 3.45646 5.60079 3.79411C5.04719 4.13176 4.57227 4.59116 4.20973 5.13972C3.8472 5.68828 3.60592 6.31256 3.50302 6.96826C3.40013 7.62397 3.43813 8.29505 3.61434 8.93388C2.81188 9.37505 2.13996 10.0325 1.66988 10.8364C1.1998 11.6403 0.949081 12.5607 0.944336 13.4999C0.944336 14.8885 1.47934 16.1943 2.40934 17.1579C2.26704 17.6473 2.19461 18.1556 2.19434 18.6666C2.19434 21.1944 3.95934 23.3037 6.32684 23.748C6.6744 24.5418 7.23563 25.2154 7.94356 25.6886C8.65149 26.1618 9.47622 26.4145 10.3193 26.4166C11.5431 26.4166 12.6493 25.8909 13.4443 25.0487C13.8501 25.4812 14.3358 25.8252 14.8726 26.0602C15.4094 26.2951 15.9864 26.4163 16.5693 26.4166C17.411 26.415 18.2344 26.1633 18.9414 25.6915C19.6484 25.2197 20.2092 24.5477 20.5568 23.7558C21.2543 23.6287 21.9177 23.3502 22.5033 22.9387C23.0889 22.5272 23.5834 21.992 23.9541 21.3684C24.3248 20.7449 24.5633 20.0472 24.6539 19.3214C24.7444 18.5956 24.6849 17.8582 24.4793 17.1579C24.9441 16.6775 25.3127 16.1072 25.5641 15.4795C25.8154 14.8519 25.9447 14.1792 25.9443 13.4999C25.9396 12.5607 25.6889 11.6403 25.2188 10.8364C24.7487 10.0325 24.0768 9.37505 23.2743 8.93388ZM10.3193 23.8333C9.43059 23.8333 8.65684 23.1823 8.48184 22.2858L8.21684 21.2499H7.19434C5.81559 21.2499 4.69434 20.0913 4.69434 18.6666C4.69434 18.2119 4.80059 17.7857 5.01059 17.3995L5.58059 16.3455L4.60059 15.6867C4.24657 15.4509 3.9553 15.1272 3.75334 14.7453C3.55138 14.3633 3.44515 13.9352 3.44434 13.4999C3.44434 12.238 4.34809 11.1439 5.54684 10.9528L7.66309 10.6169L6.33934 8.87834C6.1036 8.56429 5.96689 8.18302 5.94769 7.78607C5.92849 7.38912 6.02774 6.99566 6.232 6.6589C6.43627 6.32213 6.7357 6.05832 7.08979 5.90315C7.44389 5.74797 7.83556 5.70891 8.21184 5.79125L9.69434 6.01729V4.45825C9.69434 4.11568 9.82603 3.78714 10.0605 3.54491C10.2949 3.30267 10.6128 3.16659 10.9443 3.16659C11.2759 3.16659 11.5938 3.30267 11.8282 3.54491C12.0626 3.78714 12.1943 4.11568 12.1943 4.45825V21.8958C12.1943 22.964 11.3531 23.8333 10.3193 23.8333ZM22.2881 15.6854L21.3081 16.3442L21.8781 17.3982C22.0881 17.7857 22.1943 18.2119 22.1943 18.6666C22.1943 20.0913 21.0731 21.2499 19.6318 21.2499H18.6093L18.4068 22.2858C18.3194 22.7228 18.089 23.1152 17.7543 23.3971C17.4196 23.6789 17.0011 23.833 16.5693 23.8333C15.5356 23.8333 14.6943 22.964 14.6943 21.8958V4.45825C14.6943 3.74525 15.2543 3.16659 15.9443 3.16659C16.6343 3.16659 17.1943 3.74525 17.1943 4.52284V6.08188L18.6768 5.79125C19.0531 5.70891 19.4448 5.74797 19.7989 5.90315C20.153 6.05832 20.4524 6.32213 20.6567 6.6589C20.8609 6.99566 20.9602 7.38912 20.941 7.78607C20.9218 8.18302 20.7851 8.56429 20.5493 8.87834L19.2256 10.6182L21.3418 10.954C21.9275 11.052 22.4603 11.3618 22.8454 11.8281C23.2305 12.2944 23.4428 12.8869 23.4443 13.4999C23.4443 14.3821 23.0118 15.1985 22.2881 15.6854Z"/>
</svg>
`
};

export const logoSvg = [
  `<svg width="60" height="52" viewBox="0 0 60 52"  xmlns="http://www.w3.org/2000/svg">
<path d="M50.2896 35.8431L43.2766 50.7547L34.7098 50.7944L43.1343 33.909" />
<path d="M37.8534 26.7798L25.6809 50.836L17.2677 50.875L34.159 17.8729" />
<path d="M31.6542 3.96509L9.32031 51.4757L0.964272 51.45L24.7164 0.311716L31.6542 3.96509Z" />
<path d="M30.9019 0.308364L39.313 15.1308C41.9265 19.1783 39.8338 23.1939 37.8349 26.7799L24.7168 0.336975L30.9019 0.308364Z" />
<path d="M43.0727 21.8555C41.0928 25.3878 38.8665 29.5829 40.8627 33.1146L51.0552 50.7365L59.4876 50.6975" />
</svg>
`
];
// #endregion hardcoded SVGS (will be replaced by a proper inline svg loader when i find one)

// #region circular progress indicator
export const PageProgressIndicator = ({ progress, stroke, radius }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <>
      <div className="logo" dangerouslySetInnerHTML={{ __html: logoSvg[0] }} />
      <svg height={radius * 2} width={radius * 2} id="progress-indicator">
        <circle
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
    </>
  );
};
// #endregion circular progress indicator

// #region the primary Navigation bar

// navigation menu
export default () => {
  // state & accompanying setter
  const [sections, setSections] = useState([]); // the initial state used in jsx
  const [pageProgress, setPageProgress] = useState(0); // the initial state used in jsx

  // #region local function state (not for use in jsx!!!)
  const offset = 0;
  let prevPosition = 0;
  let sectionCPY = [];
  let ellipses = [];
  let sectionBreakpoints = [];
  // #endregion local function state (not reliable for use in jsx!!!)

  // #region useCallback functions modifying local data (cannot be referenced in jsx)
  const checkEllipses = useCallback((currentSection = 0) => {
    if (ellipses.length < 1) {
      ellipses = document.getElementsByName("ellipses");
    } else {
      ellipses = "";
    }

    // if still nothing, return
    if (ellipses.length < 1) return;

    ellipses[currentSection].checked = true;
    for (let i = currentSection; i < sections.length; ++i)
      if (ellipses[i].checked) sections[i][0].scrollIntoView(true);
    // sass logic handles the checked input box for us
  });
  // calculate section lengths on a 1:1 correspondence with the sections
  const measureSections = useCallback(() => {
    // if no value passed in, default to the react state held section list
    const newMeasurements = [0]; // first breakpoint is 0!
    sectionCPY
      .map(element => element[0].clientHeight) // get all the heights (in backward order)
      .reduce((accumulatedHeight, nextSectionHeight, i) => {
        // then reduce these to create a mapping of each sections height from the top of the page

        // push new measurement (first section breakpoint should be 0!)
        newMeasurements.push(accumulatedHeight - offset);

        return accumulatedHeight + nextSectionHeight; // keep accumulating
      });
    // set new measurements
    sectionBreakpoints = newMeasurements; // set the new measurements on this components state so it forces an update of the UI
  });

  const handleCurrentPosition = useCallback(() => {
    let thisPosition;
    if (typeof window !== "undefined") {
      thisPosition = window.scrollY;
    } else {
      thisPosition = document.body.scrollTop;
    }
    const thisPageProgress =
      (thisPosition / sectionBreakpoints[sectionBreakpoints.length - 1]) * 100;
    setPageProgress(thisPageProgress > 100 ? 100 : thisPageProgress);

    if (
      thisPosition - prevPosition > 0 ||
      Math.abs(prevPosition - thisPosition) > 0
    ) {
      // we only handle every 30pixels we scroll down OR up to reduce overhead
      let currentSection;
      let iter = 0;
      // eslint-disable-next-line for-direction
      while (iter < sectionBreakpoints.length) {
        if (thisPosition > sectionBreakpoints[iter]) currentSection = iter;
        iter++;
      }
      checkEllipses(currentSection);
    }
    prevPosition = thisPosition; // now this position is the previous one
  });
  // #endregion functions modifying local data (cannot be referenced in jsx)

  // componentDidMount
  useEffect(() => {
    // #region get all the sections which will be used to determine the page height
    const documentGets = document.getElementsByTagName("section");
    sectionCPY = Object.keys(documentGets).map(elem => [documentGets[elem]]);

    if (sectionCPY.length > 0) {
      setSections(
        [
          ...sections, // prevState
          ...sectionCPY // set initial section state for local functions
        ] /* newState */
      ); // set initial section state for jsx
      // #endregion get all the sections which will be used to determine the page height

      ellipses = document.getElementsByName("ellipses");

      // #region attatch window events
      if (typeof window !== "undefined") {
        window.onresize = () => measureSections(); // recalculare section heights
        window.onscroll = () => handleCurrentPosition(); // handle logic for when we scroll
      }
      // #endregion window events

      // #region call initial window events
      measureSections(); // section state not accessible in this componentDidMount function call, use the local copy instead
      handleCurrentPosition();
      checkEllipses(0); // default to top of page
      // #end region call initial window events
    }

    // on component unmount
    return () => {
      window.removeEventListener(onresize, measureSections);
      window.removeEventListener(onscroll, handleCurrentPosition);
    };
  }, []);

  // onScroll
  useEffect(() => {
    // console.error(pageProgress)
  }, [pageProgress]);

  // react jsx
  return (
    <>
      <PageProgressIndicator
        radius={50} // in px
        progress={pageProgress}
        stroke={1} // thickness
      />
      <nav className="ellipses-bar" id="ellipses-bar">
        {(sections.length > 0 && (
          <>
            <h3 className="ellipses__text">explore here</h3>
            {sections.map((sectionName, i) => (
              <input
                onClick={() => checkEllipses(i)}
                onChange={() => checkEllipses(i)}
                type="radio"
                name="ellipses"
                id={`ellipses-page__${i}`}
              />
            )) // sass logic handles which one is checked
            }
            <div id="slider">
              {sections.map((sectionName, i) => (
                <label key={`label${i}`} htmlFor={`ellipses-page__${i}`}>
                  <span key={`text${i}`} className="slider-label">
                    {sectionName[0].id}
                  </span>
                  <span key={`number${i}`} className="slider-number">
                    {i}
                  </span>
                  <div
                    key={`icon${i}`}
                    dangerouslySetInnerHTML={{
                      __html: navSvgs[sectionName[0].id]
                    }}
                    description="navigation icon, click me to navigate to a new section"
                  />
                </label>
              ))}
            </div>
          </>
        )) || (
          <Link to="./blog">
            <h3 className="ellipses__text" style={{color:'white'}}>go back</h3>
          </Link>
        )}
      </nav>
    </>
  );
};
// #endregion Ellipse Navigation bar
