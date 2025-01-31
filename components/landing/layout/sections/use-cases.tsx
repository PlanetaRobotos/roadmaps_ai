'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Settings2, CreditCard, Wand2, LayoutGrid, Magnet } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const TrainingIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="61"
    height="60"
    viewBox="0 0 61 60"
    fill="none"
  >
    <rect x="0.5" width="60" height="60" rx="30" fill="white"></rect>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M26.0884 25.069C26.6909 25.1268 27.275 25.2498 27.8384 25.4396L29.3686 23.7513C29.8136 23.2584 29.8796 22.9988 30.5579 23.3279C31.2345 23.6587 31.7827 24.0261 32.3224 24.5151C32.9012 25.0431 32.7047 25.192 32.3891 25.8211L31.3724 27.8598C31.7529 28.3147 32.0824 28.8154 32.3505 29.358L34.6288 29.2523C35.3253 29.2211 35.5448 29.0998 35.7919 29.8448C36.0231 30.5349 36.1359 31.1817 36.1635 31.9384C36.1912 32.692 35.9281 32.6459 35.2997 32.8533L33.1402 33.5672C33.0848 34.1707 32.9565 34.7611 32.7685 35.3228L34.4483 36.8579C34.9689 37.3288 35.2065 37.3958 34.8558 38.0976C34.5306 38.749 34.1501 39.2877 33.638 39.8398C33.1239 40.393 32.9682 40.1735 32.3763 39.8792L30.3469 38.8572C29.8895 39.2377 29.3845 39.5689 28.8406 39.8366L28.9466 42.1103C28.9767 42.8068 29.0984 43.0263 28.3537 43.2738C27.664 43.5047 27.015 43.6174 26.2608 43.6447C25.5072 43.6724 25.5533 43.4086 25.3448 42.7806L24.6314 40.621C24.0275 40.5653 23.442 40.4366 22.88 40.249L21.3406 41.9352C20.8697 42.4515 20.8016 42.6923 20.1002 42.3401C19.4498 42.0153 18.9116 41.6398 18.358 41.1217C17.8055 40.6072 18.0247 40.4526 18.319 39.8611L19.3463 37.8221C18.9686 37.3675 18.6374 36.8646 18.3683 36.3207L16.0899 36.4352C15.4293 36.4678 15.1999 36.6065 14.9541 35.8923C14.7073 35.1771 14.5793 34.5327 14.5463 33.8062C14.5084 33.0218 14.7566 33.0569 15.4173 32.8342C16.1424 32.5913 16.8644 32.3498 17.5875 32.1087L17.5878 32.1104C17.6474 31.5094 17.7697 30.9236 17.9587 30.3647L17.9577 30.3626C17.3836 29.8431 16.8399 29.3502 16.2623 28.83C15.774 28.3839 15.5141 28.3183 15.8442 27.6392C16.1743 26.963 16.5403 26.4147 17.0304 25.8757C17.5577 25.2963 17.707 25.4931 18.3328 25.8084C19.0169 26.147 19.6981 26.4874 20.3793 26.8275L20.3771 26.836C20.8318 26.4559 21.3342 26.1261 21.8768 25.8587L21.8761 25.8573C21.8371 25.0803 21.8041 24.3488 21.7629 23.5704C21.7293 22.9098 21.5917 22.6807 22.3051 22.4353C23.0197 22.1885 23.6654 22.0602 24.3917 22.0268C25.175 21.9889 25.1406 22.2371 25.364 22.8977L26.0884 25.069ZM38.2681 18.4903L37.294 17.5343C36.9937 17.2442 36.9472 17.1003 36.5398 17.335C36.1614 17.5456 35.8511 17.7907 35.5377 18.1162C35.2267 18.4385 35.3607 18.5219 35.5565 18.8648C35.7894 19.2708 36.0057 19.6531 36.2369 20.0538C36.0221 20.3446 35.8437 20.652 35.7075 20.9758L35.705 20.9708C35.2504 20.9747 34.793 20.98 34.3398 20.9814C33.9196 20.9853 33.787 20.9219 33.6643 21.3715C33.5494 21.7924 33.5019 22.1828 33.509 22.6318C33.5153 23.0839 33.6742 23.0463 34.0536 23.1516C34.5019 23.2729 34.9249 23.385 35.3717 23.5116C35.4206 23.8598 35.5164 24.2055 35.6476 24.5417C35.3292 24.8623 35.0065 25.1889 34.6863 25.5101C34.3983 25.8087 34.2547 25.8576 34.4891 26.2644C34.7019 26.6413 34.9448 26.9512 35.2696 27.2622C35.5919 27.5757 35.6753 27.4442 36.0182 27.2473L37.2001 26.5711C37.4915 26.7853 37.8043 26.964 38.1274 27.1041L38.1345 28.4675C38.1348 28.859 38.0607 29.003 38.494 29.1282C38.9305 29.2516 39.3195 29.3073 39.7543 29.3048C40.2206 29.3034 40.194 29.1544 40.3039 28.7537L40.6667 27.4388C41.0163 27.3856 41.3656 27.2977 41.6968 27.1633L42.6599 28.1197C42.9433 28.398 42.9904 28.5509 43.3841 28.3293C43.777 28.1119 44.0915 27.8768 44.3993 27.5668C44.7273 27.2335 44.6021 27.1473 44.3989 26.7888L43.7263 25.6045C43.945 25.3162 44.1216 25.0023 44.2642 24.6775L45.6216 24.669C46.012 24.6676 46.1578 24.7438 46.2826 24.3116C46.4046 23.8775 46.4596 23.4889 46.4574 23.0555C46.4535 22.5846 46.3099 22.6133 45.9003 22.5023L44.5968 22.1424C44.5415 21.7917 44.4539 21.4392 44.3153 21.1048L45.272 20.1439C45.5535 19.8605 45.7067 19.8141 45.4855 19.4229C45.2663 19.0268 45.0305 18.7127 44.7213 18.4091C44.3858 18.079 44.3057 18.2045 43.9433 18.407L42.7617 19.0807C42.4699 18.863 42.1571 18.6885 41.8358 18.5488L41.8256 17.1893C41.8231 16.768 41.8848 16.6315 41.433 16.5113C41.0181 16.3978 40.6245 16.3492 40.1745 16.3538C39.7224 16.3648 39.76 16.5191 39.6547 16.9052L39.2951 18.2141C38.9476 18.269 38.6004 18.3609 38.2681 18.4903ZM38.5238 20.9268C39.5688 20.1208 41.0734 20.3183 41.8802 21.3701C42.6819 22.4144 42.4869 23.9201 41.4376 24.725C40.3869 25.5289 38.8844 25.3325 38.083 24.285C37.2738 23.2343 37.4738 21.7314 38.5238 20.9268ZM24.6225 28.8966C22.4445 29.3026 21.0083 31.3973 21.4144 33.5757C21.8211 35.7526 23.9144 37.1895 26.0931 36.7834C28.2714 36.3778 29.7069 34.2828 29.3019 32.104C28.8952 29.9264 26.7998 28.4913 24.6225 28.8966Z"
      fill="#FF9900"
    ></path>
  </svg>
);

const MonetizationIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
  >
    <rect width="60" height="60" rx="30" fill="white"></rect>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.9993 22C13.9993 20.9391 14.4207 19.9217 15.1708 19.1716C15.921 18.4214 16.9384 18 17.9993 18H41.9993C43.0601 18 44.0775 18.4214 44.8277 19.1716C45.5778 19.9217 45.9993 20.9391 45.9993 22H13.9993ZM13.9993 26V38C13.9993 39.0609 14.4207 40.0783 15.1708 40.8284C15.921 41.5786 16.9384 42 17.9993 42H41.9993C43.0601 42 44.0775 41.5786 44.8277 40.8284C45.5778 40.0783 45.9993 39.0609 45.9993 38V26H13.9993ZM19.9993 36C19.9993 35.4696 20.21 34.9609 20.5851 34.5858C20.9601 34.2107 21.4688 34 21.9993 34H23.9993C24.5297 34 25.0384 34.2107 25.4135 34.5858C25.7886 34.9609 25.9993 35.4696 25.9993 36C25.9993 36.5304 25.7886 37.0391 25.4135 37.4142C25.0384 37.7893 24.5297 38 23.9993 38H21.9993C21.4688 38 20.9601 37.7893 20.5851 37.4142C20.21 37.0391 19.9993 36.5304 19.9993 36Z"
      fill="#53C457"
    ></path>
  </svg>
);

const OnboardingIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
  >
    <rect width="60" height="60" rx="30" fill="white"></rect>
    <path
      d="M36.9324 22.4645L34.6757 24.7212L36.9324 26.9779L39.1891 24.7212L36.9324 22.4645Z"
      fill="#6060F4"
    ></path>
    <path
      d="M33.9839 25.4138L15.4255 43.9722L17.6823 46.2289L36.2406 27.6705L33.9839 25.4138Z"
      fill="#6060F4"
    ></path>
    <path
      d="M43.7198 32.9348C42.9797 32.7433 42.3275 32.3041 41.872 31.6902C41.4164 31.0763 41.1849 30.3249 41.216 29.5611C41.2205 29.4406 41.1805 29.3227 41.1035 29.23C41.0265 29.1373 40.918 29.0763 40.7988 29.0586C40.6796 29.041 40.558 29.0679 40.4575 29.1344C40.3569 29.2008 40.2844 29.302 40.2539 29.4186C40.0625 30.1587 39.6232 30.8109 39.0093 31.2665C38.3954 31.7221 37.644 31.9536 36.8801 31.9224C36.7597 31.9178 36.6418 31.9579 36.5491 32.0349C36.4564 32.1119 36.3954 32.2204 36.3777 32.3396C36.3601 32.4588 36.387 32.5804 36.4535 32.6809C36.5199 32.7815 36.6211 32.854 36.7377 32.8845C37.4778 33.076 38.13 33.5153 38.5856 34.1291C39.0411 34.743 39.2726 35.4945 39.2415 36.2583C39.237 36.3787 39.277 36.4966 39.354 36.5893C39.431 36.682 39.5395 36.743 39.6587 36.7607C39.778 36.7783 39.8995 36.7513 40 36.6849C40.1006 36.6185 40.1731 36.5173 40.2036 36.4007C40.3948 35.6605 40.8341 35.0081 41.448 34.5525C42.062 34.0969 42.8135 33.8655 43.5774 33.8969C43.6978 33.9014 43.8157 33.8614 43.9084 33.7844C44.0011 33.7074 44.0621 33.5989 44.0798 33.4796C44.0974 33.3604 44.0704 33.2389 44.004 33.1384C43.9376 33.0378 43.8364 32.9653 43.7198 32.9348Z"
      fill="#6060F4"
    ></path>
    <path
      d="M43.8079 15.1957C43.3603 15.507 42.8195 15.6555 42.2756 15.6165C41.7317 15.5775 41.2177 15.3533 40.819 14.9813C40.7306 14.8995 40.6152 14.8532 40.4948 14.8513C40.3744 14.8493 40.2575 14.8918 40.1665 14.9706C40.0755 15.0495 40.0168 15.1591 40.0016 15.2785C39.9863 15.398 40.0157 15.5188 40.084 15.618C40.3953 16.0656 40.5438 16.6064 40.5047 17.1503C40.4657 17.6941 40.2416 18.2082 39.8696 18.6068C39.7879 18.6952 39.7416 18.8106 39.7397 18.931C39.7377 19.0513 39.7802 19.1682 39.859 19.2591C39.9378 19.3501 40.0474 19.4089 40.1668 19.4241C40.2862 19.4394 40.407 19.4101 40.5062 19.3418C40.9539 19.0306 41.4947 18.8821 42.0385 18.9212C42.5824 18.9602 43.0964 19.1843 43.4951 19.5563C43.5835 19.638 43.6989 19.6842 43.8192 19.6862C43.9396 19.6881 44.0564 19.6456 44.1474 19.5668C44.2384 19.488 44.2971 19.3784 44.3124 19.259C44.3277 19.1396 44.2984 19.0188 44.2301 18.9197C43.9189 18.472 43.7704 17.9312 43.8094 17.3873C43.8484 16.8435 44.0726 16.3294 44.4445 15.9307C44.5262 15.8424 44.5725 15.7269 44.5744 15.6066C44.5764 15.4862 44.5339 15.3694 44.4551 15.2784C44.3763 15.1874 44.2667 15.1287 44.1473 15.1134C44.0279 15.0982 43.9071 15.1275 43.8079 15.1957Z"
      fill="#6060F4"
    ></path>
    <path
      d="M24.0375 17.0501C24.9509 17.5624 25.6612 18.3722 26.05 19.3446C26.4389 20.317 26.4829 21.3932 26.1747 22.3941C26.1397 22.5093 26.1484 22.6334 26.1992 22.7426C26.25 22.8517 26.3393 22.9383 26.45 22.9858C26.5607 23.0333 26.685 23.0382 26.7991 22.9997C26.9132 22.9613 27.0091 22.8821 27.0684 22.7773C27.5807 21.8639 28.3905 21.1536 29.3629 20.7647C30.3353 20.3758 31.4116 20.3319 32.4124 20.6401C32.5277 20.6751 32.6517 20.6664 32.7609 20.6156C32.8701 20.5648 32.9567 20.4755 33.0042 20.3648C33.0516 20.2541 33.0566 20.1298 33.0181 20.0157C32.9796 19.9016 32.9004 19.8057 32.7956 19.7464C31.8822 19.234 31.172 18.4242 30.7831 17.4518C30.3942 16.4795 30.3502 15.4032 30.6584 14.4023C30.6934 14.2871 30.6846 14.163 30.6338 14.0538C30.583 13.9446 30.4938 13.858 30.3831 13.8106C30.2724 13.7631 30.1481 13.7582 30.034 13.7966C29.9199 13.8351 29.824 13.9143 29.7646 14.0191C29.2523 14.9325 28.4426 15.6427 27.4702 16.0316C26.4978 16.4205 25.4216 16.4645 24.4207 16.1562C24.3055 16.1213 24.1814 16.13 24.0723 16.1808C23.9631 16.2316 23.8765 16.3209 23.829 16.4316C23.7816 16.5422 23.7766 16.6665 23.8151 16.7806C23.8535 16.8947 23.9328 16.9907 24.0375 17.0501Z"
      fill="#6060F4"
    ></path>
  </svg>
);

const EducationIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
  >
    <rect width="60" height="60" rx="30" fill="white"></rect>
    <path
      d="M28.9058 34.377V42.0365C28.9058 42.9072 28.56 43.7421 27.9444 44.3577C27.3287 44.9734 26.4938 45.3192 25.6232 45.3192H17.9636C17.093 45.3192 16.258 44.9734 15.6424 44.3577C15.0268 43.7421 14.6809 42.9072 14.6809 42.0365V34.377C14.6809 33.5063 15.0268 32.6714 15.6424 32.0558C16.258 31.4401 17.093 31.0943 17.9636 31.0943H25.6232C26.4938 31.0943 27.3287 31.4401 27.9444 32.0558C28.56 32.6714 28.9058 33.5063 28.9058 34.377ZM25.6232 14.6809H17.9636C17.093 14.6809 16.258 15.0268 15.6424 15.6424C15.0268 16.258 14.6809 17.093 14.6809 17.9636V25.6232C14.6809 26.4938 15.0268 27.3287 15.6424 27.9444C16.258 28.56 17.093 28.9058 17.9636 28.9058H25.6232C26.4938 28.9058 27.3287 28.56 27.9444 27.9444C28.56 27.3287 28.9058 26.4938 28.9058 25.6232V17.9636C28.9058 17.093 28.56 16.258 27.9444 15.6424C27.3287 15.0268 26.4938 14.6809 25.6232 14.6809ZM42.0365 31.0943H34.377C33.5063 31.0943 32.6714 31.4401 32.0558 32.0558C31.4401 32.6714 31.0943 33.5063 31.0943 34.377V42.0365C31.0943 42.9072 31.4401 43.7421 32.0558 44.3577C32.6714 44.9734 33.5063 45.3192 34.377 45.3192H42.0365C42.9072 45.3192 43.7421 44.9734 44.3577 44.3577C44.9734 43.7421 45.3192 42.9072 45.3192 42.0365V34.377C45.3192 33.5063 44.9734 32.6714 44.3577 32.0558C43.7421 31.4401 42.9072 31.0943 42.0365 31.0943ZM32.1885 22.8876H37.1125V27.8116C37.1125 28.1018 37.2278 28.3801 37.433 28.5853C37.6382 28.7905 37.9165 28.9058 38.2067 28.9058C38.497 28.9058 38.7753 28.7905 38.9805 28.5853C39.1857 28.3801 39.301 28.1018 39.301 27.8116V22.8876H44.225C44.5152 22.8876 44.7935 22.7723 44.9987 22.5671C45.2039 22.3619 45.3192 22.0836 45.3192 21.7934C45.3192 21.5032 45.2039 21.2248 44.9987 21.0196C44.7935 20.8144 44.5152 20.6991 44.225 20.6991H39.301V15.7751C39.301 15.4849 39.1857 15.2066 38.9805 15.0014C38.7753 14.7962 38.497 14.6809 38.2067 14.6809C37.9165 14.6809 37.6382 14.7962 37.433 15.0014C37.2278 15.2066 37.1125 15.4849 37.1125 15.7751V20.6991H32.1885C31.8983 20.6991 31.62 20.8144 31.4148 21.0196C31.2096 21.2248 31.0943 21.5032 31.0943 21.7934C31.0943 22.0836 31.2096 22.3619 31.4148 22.5671C31.62 22.7723 31.8983 22.8876 32.1885 22.8876Z"
      fill="#54A9FF"
    ></path>
  </svg>
);

const LeadsIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
  >
    <rect width="60" height="60" rx="30" fill="white"></rect>
    <path
      d="M30.1335 34.8442L27.371 37.6067C25.8269 39.1508 23.3159 39.1508 21.7735 37.6067C20.2311 36.0626 20.2295 33.5517 21.7735 32.0076L24.5361 29.2451L19.8858 24.5948L17.1233 27.3574C13.0156 31.465 13.0156 38.1493 17.1233 42.257C21.2309 46.3646 27.9152 46.3646 32.0229 42.257L34.7854 39.4944L30.1335 34.8442Z"
      fill="#FF6B3C"
    ></path>
    <path
      d="M25.4967 18.9819L21.2795 23.1991L25.9304 27.85L30.1476 23.6328L25.4967 18.9819Z"
      fill="#FF6B3C"
    ></path>
    <path
      d="M35.7459 29.2303L31.5287 33.4475L36.1796 38.0984L40.3968 33.8812L35.7459 29.2303Z"
      fill="#FF6B3C"
    ></path>
    <path
      d="M29.7998 20.7728C29.6913 20.7728 29.5828 20.7464 29.4825 20.6905C29.1651 20.5146 29.05 20.115 29.226 19.796L31.0775 16.4514C31.1614 16.2984 31.3044 16.1866 31.4705 16.1373C31.6383 16.0896 31.8175 16.1093 31.9704 16.1932L34.1936 17.4232L35.5338 15.001C35.7097 14.6837 36.1109 14.5686 36.4283 14.7445C36.7457 14.9205 36.8608 15.32 36.6848 15.6391L35.0256 18.6384C34.9418 18.7913 34.7987 18.9031 34.631 18.9524C34.4633 19.0001 34.284 18.9804 34.1311 18.8965L31.9079 17.6666L30.3754 20.4357C30.2553 20.6494 30.0301 20.7728 29.7998 20.7728Z"
      fill="#FF6B3C"
    ></path>
    <path
      d="M38.9885 29.9614C38.88 29.9614 38.7715 29.9351 38.6711 29.8792C38.3538 29.7033 38.2387 29.3037 38.4146 28.9847L40.2662 25.64C40.35 25.4871 40.4931 25.3753 40.6592 25.326C40.8269 25.2783 41.0061 25.298 41.1591 25.3819L43.3823 26.6118L44.7241 24.1881C44.9 23.8707 45.3012 23.7556 45.6186 23.9315C45.936 24.1075 46.0511 24.5071 45.8751 24.8261L44.2143 27.827C44.1304 27.98 43.9874 28.0918 43.8213 28.1411C43.6536 28.1888 43.4743 28.1691 43.3214 28.0852L41.0982 26.8552L39.5657 29.6243C39.4456 29.8397 39.2204 29.9614 38.9885 29.9614Z"
      fill="#FF6B3C"
    ></path>
  </svg>
);

interface Feature {
  icon: React.FC<IconProps>;
  title: string;
  description: string;
  longDescription: string;
  action: string;
  src: string;
}

const features: Feature[] = [
  {
    icon: TrainingIcon,
    title: 'Enriched Training',
    description: 'For training professionals',
    longDescription:
      'Showcase your professionalism by offering complementary mini-courses with your workshops, webinars, seminars, or private tutoring sessions.',
    action: 'Discover',
    src: '/images/use-cases/3b-enrich-300x300.webp'
  },
  {
    icon: MonetizationIcon,
    title: 'Monetization',
    description: 'For content creators',
    longDescription:
      'Transform your expertise into profitable mini-courses. Set your pricing, manage subscriptions, and track earnings.',
    action: 'Learn More',
    src: '/images/use-cases/monetization-img.webp'
  },
  {
    icon: OnboardingIcon,
    title: 'Onboarding',
    description: 'For HR professionals',
    longDescription:
      'Create engaging onboarding experiences with bite-sized courses. Perfect for remote teams and scaling organizations.',
    action: 'Explore',
    src: '/images/use-cases/onboarding-img.png'
  },
  {
    icon: EducationIcon,
    title: 'In-App Education',
    description: 'For product teams',
    longDescription:
      'Integrate educational content directly into your product. Improve user engagement and reduce support queries.',
    action: 'Get Started',
    src: '/images/use-cases/in-app-img.webp'
  },
  {
    icon: LeadsIcon,
    title: 'Lead Generation',
    description: 'For marketing teams',
    longDescription:
      'Convert visitors into leads with valuable educational content. Track engagement and nurture prospects.',
    action: 'View Demo',
    src: '/images/use-cases/lead-img.png'
  }
];

const SWITCH_INTERVAL = 2500;
const PROGRESS_INTERVAL = 25;

export const UseCasesSection = () => {
  const [activeFeature, setActiveFeature] = useState(features[0].title);
  const [isAutoSwitching, setIsAutoSwitching] = useState(true);
  const [progress, setProgress] = useState(0);

  const getCurrentIndex = useCallback(() => {
    return features.findIndex((f) => f.title === activeFeature);
  }, [activeFeature]);

  const switchToNextFeature = useCallback(() => {
    const currentIndex = getCurrentIndex();
    const nextIndex = (currentIndex + 1) % features.length;
    setActiveFeature(features[nextIndex].title);
  }, [getCurrentIndex]);

  // Handle progress and auto-switching
  useEffect(() => {
    if (!isAutoSwitching) return;

    let progressTimer: NodeJS.Timeout;
    let switchTimer: NodeJS.Timeout;

    // Wait 1 second before starting the progress fill
    const delayTimer = setTimeout(() => {
      // Start filling the progress bar
      progressTimer = setInterval(() => {
        setProgress((prev) => {
          const increment =
            (PROGRESS_INTERVAL / (SWITCH_INTERVAL - 1000)) * 100;
          const newProgress = prev + increment;
          if (newProgress >= 100) {
            clearInterval(progressTimer); // Stop the progress fill
            switchToNextFeature(); // Switch to the next feature
            return 0; // Reset progress to 0
          }
          return newProgress;
        });
      }, PROGRESS_INTERVAL);
    }, 1000); // 1-second delay

    // Cleanup timers
    return () => {
      clearTimeout(delayTimer);
      clearInterval(progressTimer);
      clearTimeout(switchTimer);
    };
  }, [isAutoSwitching, activeFeature, switchToNextFeature]);

  const handleFeatureClick = (title: string) => {
    setIsAutoSwitching(false);
    setActiveFeature(title);
  };

  return (
    <div className="relative w-full overflow-hidden bg-slate-50 py-20">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-slate-900">
            Discover Use Cases and Expand Your Benefits
          </h2>
          <div className="mx-auto max-w-3xl space-y-4">
            <p className="text-lg text-slate-600">
              Unlock the potential of your expertise with professional
              mini-courses. Seamlessly integrate educational content into your
              workshops, webinars, and training sessions.
            </p>
            <p className="text-lg text-slate-600">
              Transform your knowledge into automated learning experiences that
              engage customers, streamline onboarding, and drive business growth
              through strategic content delivery.
            </p>
          </div>
        </div>

        {/* Icons Navigation */}
        <div className="mx-auto mb-16 flex hidden max-w-2xl justify-between md:flex">
          {features.map((feature, index) => (
            <div key={feature.title} className="flex flex-col items-center">
              <button
                onClick={() => handleFeatureClick(feature.title)}
                className={cn(
                  'group flex flex-col items-center gap-2 transition-all duration-300',
                  activeFeature === feature.title
                    ? 'scale-110'
                    : 'hover:scale-105'
                )}
              >
                <div
                  className={cn(
                    'mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm transition-all duration-300',
                    activeFeature === feature.title
                      ? 'shadow-md ring-2 ring-primary'
                      : 'group-hover:ring-1 group-hover:ring-primary/50'
                  )}
                >
                  <feature.icon
                    className={cn(
                      'transition-all duration-300',
                      activeFeature === feature.title
                        ? '[&_path]:fill-primary [&_rect]:fill-white'
                        : '[&_path]:fill-slate-400 group-hover:[&_path]:fill-primary/80 [&_rect]:fill-white'
                    )}
                  />
                </div>
                <span
                  className={cn(
                    'text-center text-sm font-medium transition-colors duration-300',
                    activeFeature === feature.title
                      ? 'text-primary'
                      : 'text-slate-500 group-hover:text-primary/80'
                  )}
                >
                  {feature.title}
                </span>
              </button>
              {/* Individual progress bar */}
              {isAutoSwitching && (
                <div
                  className={cn(
                    'mt-2 w-14 transition-all duration-300',
                    activeFeature === feature.title
                      ? 'opacity-100'
                      : 'opacity-30'
                  )}
                >
                  <Progress
                    value={activeFeature === feature.title ? progress : 0}
                    className="h-1"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Feature Cards */}
        <div className="hidden md:block">
          {features.map(
            (feature) =>
              feature.title === activeFeature && (
                <div
                  key={feature.title}
                  className="mx-auto flex max-w-4xl items-center gap-8 rounded-xl bg-white p-8 shadow-sm"
                >
                  <div className="h-40 w-40 flex-shrink-0">
                    <Image
                      src={feature.src}
                      alt={feature.title}
                      className="h-full w-full object-contain"
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-2xl font-semibold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="mb-3 text-lg text-slate-600">
                      {feature.description}
                    </p>
                    <p className="mb-6 text-slate-600">
                      {feature.longDescription}
                    </p>
                    <Button size="lg" variant={'outline'}>
                      {feature.action}
                    </Button>
                  </div>
                </div>
              )
          )}
        </div>

        {/* Mobile Stacked Cards */}
        <div className="space-y-4 md:hidden">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-semibold">
                      {feature.title}
                    </h3>
                    <p className="mb-2 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                    <p className="mb-4 text-sm">{feature.longDescription}</p>
                    <Button variant={'outline'}>{feature.action}</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
