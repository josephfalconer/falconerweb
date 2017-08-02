import FrontCover from '../components/FrontCover';
import Page from '../components/Page';


<div className={this.state.containerClass}>

	<DataFetcher />

	<FrontCover
		navigationLinks={this.props.navigationLinks}
		pages={this.props.pages}
		currentPageIndex={this.state.currentPageIndex}
		changePage={this.changePage}
		sliderClass={this.state.sliderClass}
		slideCoverUp={this.slideCoverUp}
	/>

	{currentPageData &&
		<Page 
			currentPageData={currentPageData}
			currentModuleName={currentModuleName}
			currentModuleData={currentModuleData}
		/>
	}
</div>