import * as React from 'react';
import { IEasyIcons, IEasyIconGroup, IEasyIconGroups, EasyIconLocation } from './eiTypes';

export type IIconDesign = 'Base' | '1' | '2' | '3' | '4' | '5' | 'fly' | 'hero' | 'geek';

/**
 * 
 * @param EasyIcons 
 * @param variation 
 *  Base:  Just the icon with hover zoom and title text in image title
 * 
 *  5: 
 * @returns 
 */
export function getEasyIconElement ( EasyIcons: IEasyIcons, variation: IIconDesign ): JSX.Element {

  let title = 'Base';
  if ( variation === '1' ) title = 'Variation 1';
  if ( variation === '2' ) title = 'Variation 2 - Background image';
  if ( variation === '3' ) title = 'Variation 3 - Double Image';
  if ( variation === '4' ) title = 'Variation 4 - Double Image Card v2';
  if ( variation === '5' ) title = 'Variation 5 - Double Image v3';
  if ( variation === 'fly' ) title = 'Variation 6 - flyingcar - https://codepen.io/flyingcar/pen/jmvLqG';
  if ( variation === 'hero' ) title = 'Variation 7 - w3 schools hero https://www.w3schools.com/cssref/tryit.php?filename=trycss3_background_hero';
  if ( variation === 'geek' ) title = 'Variation 8 - geek img https://www.geeksforgeeks.org/how-to-set-the-div-height-to-auto-adjust-to-background-size/';

  const Icons : JSX.Element = 
    <div>
      <div style={{ height: '30px', padding: '15px', fontSize: 'xxlarge' }}>
        { title }
      </div>
      <div className={ 'easy-icons-grid' }style={{ display: 'grid' }}>
        { Object.keys( EasyIcons.Groups ).map( ( group: IEasyIconGroups ) => {
          const EGroup: IEasyIconGroup = EasyIcons.Groups[ group ];
          return (
            <div className='easy-icons-group' key={ group }>
              <div className='easy-icons-group-title'>{ EGroup.Folder }</div>
              <div className='easy-icons-group-icons'>
                {
                  EGroup.Icons.map( icon => {
                    const imageUrl = `${EasyIconLocation}${EGroup.Folder}/${icon}.png`;
                    if ( !icon ) { return null ; }

                    // Look at this example for cards:  https://codepen.io/flyingcar/pen/jmvLqG
                    // Or maybe this one:  https://ehtmlu.com/blog/simple-css-image-grid/  ==>> https://codepen.io/eHtmlu/pen/BaodGVp has Hover Text
                    // Or possibly this one although maybe not:  https://codepen.io/knyttneve/pen/YgZbLO

                    else if ( variation === 'Base' ) { return easyIconDiv( EGroup, icon, imageUrl ) }
                    else if ( variation === '2' ) { return easyIconDiv2( EGroup, icon, imageUrl ) }
                    else if ( variation === '3' ) { return easyIconDiv3( EGroup, icon, imageUrl ) }
                    else if ( variation === '4' ) { return easyIconDiv4( EGroup, icon, imageUrl ) }
                    else if ( variation === '5' ) { return easyIconDivCard( EGroup, icon, imageUrl ) }
                    else if ( variation === 'fly' ) { return easyIconDivfly( EGroup, icon, imageUrl ) }
                    else if ( variation === 'hero' ) { return easyIconDivhero( EGroup, icon, imageUrl ) }
                    else if ( variation === 'geek' ) { return easyIconDivgeek( EGroup, icon, imageUrl ) }

                })}
              </div>
            </div> );
        })
        }
      </div>
    </div>;

  return Icons;
}

export function easyIconDiv( EGroup: IEasyIconGroup , icon: string, src: string ) : JSX.Element {
  const img : JSX.Element = <img key={ icon } className={ 'easy-icons-image' } src={ src } style={{ }} title={ `${EGroup.Folder}/${icon}` }/>;
  return img;
}


export function easyIconDiv2( EGroup: IEasyIconGroup , icon: string, src: string ) : JSX.Element {
  const img : JSX.Element = 
    <div className='bg-image' style={{ backgroundImage: `url(${src})` }} key={ icon } >
      <span className='bg-image-caption'>This is some span text</span>
    </div>;
  return img;
}

export function easyIconDiv3( EGroup: IEasyIconGroup , icon: string, src: string ) : JSX.Element {
  const img : JSX.Element = 
      <div className='bg-image' style={{ backgroundImage: `url(${src})`}}>
      <img key={ icon } className={ 'easy-icons-image' } src={ `${src}` } style={{ visibility: 'hidden' }} title={ `${EGroup.Folder}/${icon}` }/>
      <span className='bg-image-caption'>This is some span text</span>
    </div>;
  return img;
}

export function easyIconDiv4( EGroup: IEasyIconGroup , icon: string, src: string ) : JSX.Element {
  const img : JSX.Element = 
      <div className='bg-image-card'>
        <div className='bg-image' style={{ backgroundImage: `url(${src})`}}>
          <img key={ icon } className={ 'easy-icons-image' } src={ `${src}` } style={{ visibility: 'hidden' }} title={ `${EGroup.Folder}/${icon}` }/>
          <span className='bg-image-caption'>This is some span text</span>
          </div>
      </div>;
  return img;
}

export function easyIconDivCard( EGroup: IEasyIconGroup , icon: string, src: string ) : JSX.Element {
  const img : JSX.Element = 
      <div className='bg-image-card'>
        <div className='bg-image' style={{ backgroundImage: `url(${src})`}}>
          <img key={ icon } className={ 'easy-icons-image' } src={ `${src}` } style={{ visibility: 'hidden' }} title={ `${EGroup.Folder}/${icon}` }/>
        </div>
        <div className='bg-image-caption'>
          <span>This is some span text</span>
        </div>
      </div>;
  return img;
}

export function easyIconDivhero( EGroup: IEasyIconGroup , icon: string, src: string ) : JSX.Element {
  const img : JSX.Element = 
    <div className="hero-image"  style={{ backgroundImage: `url(${src})`}}>
      <img src={ src } style={{ visibility: 'hidden' }} />
      <div className="hero-text">
        <h1 className="font-size:50px">Link Title</h1>
        <h3>Link Desc</h3>
        <button>Hire me</button>
      </div>

    </div>;
  return img;
}

export function easyIconDivfly( EGroup: IEasyIconGroup , icon: string, src: string ) : JSX.Element {
  const img : JSX.Element = 

    <div className="fly-img-box" key={ icon }>
			<div className="inner" style={{ backgroundImage: `url(${src})`}}>
				{/* eslint-disable-next-line react/jsx-no-target-blank */}
				<a href={src} className="fly_click" target='_blank'>
					<div className="flex_this">
						<h1 className="fly_title">{ EGroup.Folder }</h1>
						<span className="fly_link">Link</span>
					</div>
				</a>
			</div>
		</div>
    ;
  return img;
}
export function easyIconDivgeek( EGroup: IEasyIconGroup , icon: string, src: string ) : JSX.Element {
  const img : JSX.Element = 

      <div className='geekwrap' style={{ backgroundImage: `url(${src})`}}>
      <h1 className='geekh1'>GeeksforGeeks</h1>
      <img className='geekimg' src={src}
            alt="Image" />
      </div>
    ;
  return img;
}

