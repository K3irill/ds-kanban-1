import Image from 'next/image';
import cn from 'classnames';

export default function Loader() {
  return (
    <div className={cn(['ds-custom-loading'])}>
      <Image
        src="/logo-circle.svg"
        width={40}
        height={40}
        alt="logo"
        className={cn(['ds-custom-loading__circle'])}
      />
      <Image
        src="/logo-feature.svg"
        width={25}
        height={25}
        alt="logo"
        className={cn(['ds-custom-loading__feature'])}
      />
    </div>
  );
}
