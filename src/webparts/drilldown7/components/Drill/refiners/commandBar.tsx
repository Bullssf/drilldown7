import * as React from 'react';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { CommandBarButton, IButtonProps, } from 'office-ui-fabric-react/lib/Button';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { ResizeGroup } from 'office-ui-fabric-react/lib/ResizeGroup';
import { OverflowSet } from 'office-ui-fabric-react/lib/OverflowSet';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { mergeStyleSets } from 'office-ui-fabric-react';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';


//import * as stylesImport from './ResizeGroup.Example.scss';
//const styles: any = stylesImport;


  export const customButtonWithIcon = (props: IButtonProps) => {

    return (
      <CommandBarButton
        {...props}
        styles={{
          ...props.styles,
          root: {backgroundColor: 'white'  ,padding:'10px 20px 10px 10px !important', height: 32, borderColor: 'white', width: 200, margin: '0px !important'},
          textContainer: { fontSize: 16, color: '#00457E' },
          icon: { 
            fontSize: 18,
            fontWeight: "bolder",
            margin: '0px 2px',
         },
        }}
      />
    );
  };

  export const customButtonNoIcon = (props: IButtonProps) => {

    return (
      <CommandBarButton
        {...props}
        styles={{
          ...props.styles,
          root: {backgroundColor: 'white'  ,padding:'10px 20px 10px 10px !important', height: 32, borderColor: 'white', width: 200, margin: '0px !important'},
          textContainer: { fontSize: 16, color: '#00457E' },
        }}       
      />
    );
  };

const styles = mergeStyleSets({
    root: {
      display: 'block',
    },
    resizeIsShort: {
        width: '400px',
      },
    settingsGroup: {
      paddingTop: '20px',
    },
    itemCountDropdown: {
      width: '180px',
    },
  });


export interface IOverflowData {
  primary: IContextualMenuItem[];
  overflow: IContextualMenuItem[];
  cacheKey?: string;
}

export interface ICMDItem {
  name: string;
  key: string;
  checked: boolean;
  icon?: string;
  disabled?: boolean;
  count: number;
  data?: number;
}

function  _functionOnClick(item){
    //This sends back the correct pivot category which matches the category on the tile.
    let e: any = event;
    alert('Hi! you clicked: ' +  e.target.innerText );

    console.log('searchForItems: e',e);
    console.log('item', item);
}

function generateData(items: ICMDItem[], checkedItem: string, cachingEnabled: boolean, showCatCounts: boolean, onClick: any): IOverflowData {
  const dataItems = [];
  let cacheKey = '';
  if ( items ) {
    for (let index = 0; index < items.length; index++) {
      let countLabel = showCatCounts ? ' (' + items[index].count + ')' : '';

      let ariaLabel = items[index].name + countLabel;
      items[index].data = items[index].count;
      const item = {
        key: items[index].key,
        name: items[index].name + countLabel,
        icon: items[index].icon ? items[index].icon : null,
        checked: items[index].name === checkedItem ? true : false,
        disabled: items[index].disabled,
        ariaLabel: items[index].name + countLabel,
        commandBarButtonAs: items[index].icon ? customButtonWithIcon : customButtonNoIcon,
        onClick: onClick,
        count: items[index].count,
        data:  items[index].count,
      };
      item.ariaLabel = ariaLabel;
      cacheKey = cacheKey + item.key;
      dataItems.push(item);
    }
  } else {
    console.log('Opps!  For some reason \'items\' were empty in generateData on commandBar.tsx...\n ref checkedItem = ' + checkedItem );
  }

  let result: IOverflowData = {
    primary: dataItems,
    overflow: [] as any[]
  };

  if (cachingEnabled) {
    result = { ...result, cacheKey };
  }

  return result;
}


export interface IResizeGroupOverflowSetExampleProps {

  items: ICMDItem[];
  cachingEnabled: boolean;
  onClick: any;
  checkedItem: string;
  WebpartHeight?:  number;    //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
  WebpartWidth?:   number;    //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
  showCatCounts: boolean;
}

export interface IResizeGroupOverflowSetExampleState {
  short: boolean;
  numberOfItems: number;
  buttonsChecked: boolean;
  cachingEnabled: boolean;
  onGrowDataEnabled: boolean;
}

export interface IMyCommandBarItem {
  key?: string;
  text: string;
  name?: string;
  ariaLabel?: string;
  onClick?: any;
  iconName?: string;
}

function computeCacheKey(primaryControls: IContextualMenuItem[]): string {
  return primaryControls.reduce((acc, current) => acc + current.key, '');
}

/**
 * Example based on:  https://developer.microsoft.com/en-us/fluentui?fabricVer=6#/controls/web/resizegroup#IResizeGroup
 */

 // export default class DrillDown extends React.Component<IDrillDownProps, IDrillDownState> {
export default class ResizeGroupOverflowSetExample extends React.Component<IResizeGroupOverflowSetExampleProps, IResizeGroupOverflowSetExampleState> {

//export default class ResizeGroupOverflowSetExample extends BaseComponent<IResizeGroupOverflowSetExampleProps, IResizeGroupOverflowSetExampleState> {

  public constructor(props:IResizeGroupOverflowSetExampleProps){
    super(props);
    this.state = {
      short: false,
      buttonsChecked: false,
      cachingEnabled: false,
      onGrowDataEnabled: false,
      numberOfItems: 20
    };
  }

    /***
 *         d8888b. d888888b d8888b.      db    db d8888b. d8888b.  .d8b.  d888888b d88888b 
 *         88  `8D   `88'   88  `8D      88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'     
 *         88   88    88    88   88      88    88 88oodD' 88   88 88ooo88    88    88ooooo 
 *         88   88    88    88   88      88    88 88~~~   88   88 88~~~88    88    88~~~~~ 
 *         88  .8D   .88.   88  .8D      88b  d88 88      88  .8D 88   88    88    88.     
 *         Y8888D' Y888888P Y8888D'      ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P 
 *                                                                                         
 *                                                                                         
 */

public componentDidUpdate(prevProps){
  let rebuildPart = false;
  if ( prevProps.checkedItem != this.props.checkedItem ) {
      rebuildPart = true;
  }

  if ( prevProps.WebpartHeight !== this.props.WebpartHeight || prevProps.WebpartWidth !== this.props.WebpartWidth ) {
      rebuildPart = true ;
    }
  if (rebuildPart === true) {
    this._updateStateOnPropsChange();
  }

}

  public render(): JSX.Element {
    const { numberOfItems, cachingEnabled, buttonsChecked, short, onGrowDataEnabled } = this.state;
    //const dataToRender = generateData(numberOfItems, cachingEnabled, buttonsChecked);
    const commandsToRender = generateData( this.props.items , this.props.checkedItem, this.props.cachingEnabled, this.props.showCatCounts, this.props.onClick );

    return (
      <div className={short ? styles.resizeIsShort : 'notResized'}>
        <ResizeGroup
          role="tabpanel"
          aria-label="Resize Group with an Overflow Set"
          data={commandsToRender}
          onReduceData={this._onReduceData}
          onGrowData={onGrowDataEnabled ? this._onGrowData : undefined}
          // tslint:disable-next-line:jsx-no-lambda
          onRenderData={data => {
            return (
              <OverflowSet
                role="menubar"
                items={data.primary}
                overflowItems={data.overflow.length ? data.overflow : null}
                onRenderItem={item => {
                  return (
                    //Wraping button in div to get ID didn't work... makes buttons small
                    //<div id={ item.name.replace(' ','') }><CommandBarButton text={item.name} iconProps={{ iconName: item.icon }} onClick={item.onClick} checked={item.checked} /></div>

                    //Example of _onRenderText where you could render the count as a smaller font size
                    //https://github.com/microsoft/fluentui/blob/cc72899b69926f902d68f3164a7845401f1dc700/packages/office-ui-fabric-react/src/components/Button/BaseButton.tsx

                    <CommandBarButton
                      role="menuitem"
                      text={ item.name }
                      ariaLabel={item.name}
                      iconProps={{ iconName: item.icon }}
                      disabled={ item.disabled }
                      onClick={ this.props.onClick }
                      checked={item.checked }
                    />


                  //<div>{  }</div>
                    //<div>{item.name}</div>
                  );
                }}
                onRenderOverflowButton={overflowItems => {
                  return <CommandBarButton menuProps={{ items: overflowItems! }} onClick={ this.props.onClick }/>;
                }}
                styles={{ root: { height: 40 } }}
              />
            );
          }}
        />

      </div>
    );
  }


  /**
   * This was just the settings used in the ResizeGroup sample which was just after the command bar.
   * <div className={styles.settingsGroup}>
          <Checkbox label="Enable caching" onChange={this._onCachingEnabledChanged} checked={cachingEnabled} />
          <Checkbox label="Set onGrowData" onChange={this._onGrowDataEnabledChanged} checked={onGrowDataEnabled} />
          <Checkbox label="Buttons checked" onChange={this._onButtonsCheckedChanged} checked={buttonsChecked} />
          <div className={styles.itemCountDropdown}>
            <Dropdown
              label="Number of items to render"
              selectedKey={numberOfItems.toString()}
              onChange={this._onNumberOfItemsChanged}
              options={[
                { key: '20', text: '20' },
                { key: '30', text: '30' },
                { key: '40', text: '40' },
                { key: '50', text: '50' },
                { key: '75', text: '75' },
                { key: '100', text: '100' },
                { key: '200', text: '200' }
              ]}
            />
          </div>
        </div>
   */
  private _onReduceData = (currentData: any): any => {
    if (currentData.primary.length === 0) {
      return undefined;
    }

    const overflow = [...currentData.primary.slice(-1), ...currentData.overflow];
    const primary = currentData.primary.slice(0, -1);

    let cacheKey = undefined;
    if (this.state.cachingEnabled) {
      cacheKey = computeCacheKey(primary);
    }
    return { primary, overflow, cacheKey };
  }

  private _onGrowData = (currentData: any): any => {
    if (currentData.overflow.length === 0) {
      return undefined;
    }

    const overflow = currentData.overflow.slice(1);
    const primary = [...currentData.primary, ...currentData.overflow.slice(0, 1)];

    let cacheKey = undefined;
    if (this.state.cachingEnabled) {
      cacheKey = computeCacheKey(primary);
    }
    return { primary, overflow, cacheKey };
  }

  private _onCachingEnabledChanged = (_: React.FormEvent<HTMLElement | HTMLInputElement>, checked: boolean): void => {
    this.setState({ cachingEnabled: checked });
  }

  private _onGrowDataEnabledChanged = (_: React.FormEvent<HTMLElement | HTMLInputElement>, checked: boolean): void => {
    this.setState({ onGrowDataEnabled: checked });
  }

  private _onButtonsCheckedChanged = (_: React.FormEvent<HTMLElement | HTMLInputElement>, checked: boolean): void => {
    this.setState({ buttonsChecked: checked });
  }

  private _onNumberOfItemsChanged = (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    this.setState({ numberOfItems: parseInt(option.text, 10) });
  }

  
  private _sampleOnClick = (item): void => {
    //This sends back the correct pivot category which matches the category on the tile.
    let e: any = event;
    alert('Hi! you clicked: ' +  e.target.innerText );

    console.log('searchForItems: e',e);

  /*  This confirms the text is possible to get as  e.target.innerText

    for ( let c of e.target.innerText ) {
      console.log('e.target.innerText: ', c);
    }

    */
    /* These had various degress of success finding the text of the button.
    console.log('', e.target.innerText.length, e.target.innerText );

    console.log('lastElementChild.textContext', e.target.parentElement.lastElementChild.textContext);
    console.log('lastElementChild.textContext', e.target.nextSibling.textContext);
    console.log('searchForItems: item', item);
    console.log('searchForItems: this', this);
*/
    //Be sure to pass item.props.itemKey to get filter value

  }

  private _updateStateOnPropsChange() {
    console.log('commandBar Prop changed!', this.props.checkedItem );
  }
}