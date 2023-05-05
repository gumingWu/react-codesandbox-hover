import { ReactElement, useRef, useState } from 'react'

export function ExampleLayout({
  filename,
  left,
  right
}: { filename: string, left: ReactElement, right: ReactElement }) {
  const contentRef = useRef(null);
  const [overlayStyles, setOverlayStyles] = useState([]);

  return (
    <div className="lg:pl-10 lg:pr-5 w-full">
      <div className="mt-12 mb-2 lg:my-16 max-w-7xl mx-auto flex flex-col w-full lg:rounded-2xl lg:bg-card lg:dark:bg-card-dark">
        <div className="flex-col gap-0 lg:gap-5 lg:rounded-2xl lg:bg-gray-10 lg:dark:bg-gray-70 shadow-inner-border dark:shadow-inner-border-dark lg:flex-row flex grow w-full mx-auto items-center bg-cover bg-center lg:bg-right lg:bg-[length:60%_100%] bg-no-repeat bg-meta-gradient dark:bg-meta-gradient-dark">
          <div className="lg:-m-5 h-full shadow-nav dark:shadow-nav-dark lg:rounded-2xl bg-wash dark:bg-gray-95 w-full flex grow flex-col">
            <div className="w-full bg-card dark:bg-wash-dark lg:rounded-t-2xl border-b border-black/5 dark:border-white/5">
              <h3 className="text-sm my-1 mx-5 text-tertiary dark:text-tertiary-dark select-none">
                {filename}
              </h3>
            </div>
            {left}
          </div>
          <div
            ref={contentRef}
            className="relative mt-0 lg:-my-20 w-full p-2.5 xs:p-5 lg:p-10 flex grow justify-center">
            {right}
            <div className='absolute z-10 inset-0 pointer-events-none transition-opacity transform-gpu'>
              {overlayStyles.map((styles, i) => (
                <div
                  key={i}
                  className="top-0 left-0 bg-blue-30/5 border-2 border-link dark:border-link-dark absolute rounded-lg"
                  style={styles}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}