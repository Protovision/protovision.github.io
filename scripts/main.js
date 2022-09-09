(() => {
	(window . addEventListener)('DOMContentLoaded' , async (event) => {
		const main = (document . querySelector)('main');
		const title = (document . getElementById)('swoope-title');
		const blog = (document . getElementById)('swoope-blog');
		const contentContainer = (document . getElementById)('swoope-content');
		const opacityTransitionTime = 400;
		const makeErrorContent = (message) => {
			const fragment = (document . createDocumentFragment)();
			const p = (document . createElement)('p');
			const strong = (document . createElement)('strong');
			const text = (document . createTextNode)(message);
			(strong . appendChild)(text);
			(p . appendChild)(strong);
			(fragment . appendChild)(p);
			return(fragment);};
		const wait = (ms) => {
			return new Promise(resolve => setTimeout(resolve , ms));};
		const clearContent = async () => {
			scrollTo(0 , 0);
			(contentContainer . classList . add)('loading');
			(contentContainer . classList . remove)('loaded');
			await(wait(opacityTransitionTime));};
		const displayContent = async (content , hash) => {
			if(contentContainer . lastChild){
				(contentContainer . replaceChild)(
					content , contentContainer . lastChild);}
			else{
				(contentContainer . appendChild)(content);};
			(contentContainer . classList . add)('loaded');
			(contentContainer . classList . remove)('loading');
			if(hash){
				((document . getElementById)(hash) . 
					scrollIntoView)();};};
		const fetchContent = async (path) => {
			const response = await(fetch(path));
			if(!(response . ok)){
				throw(Error(
					'Error ' + response . status + ': ' + response . statusText));};
			const fragment = (document . createDocumentFragment)();
			const content = (document . createElement)('article');
			content . innerHTML = await((response . text)());
			(fragment . appendChild)(content);
			return(fragment);};
		const parseUrl = (url) => {
			if(! url){
				return(null);};
			const urlObject = new URL(url);
			const hash = (
				(urlObject . pathname == '/' || 
					urlObject . pathname == '/index.html') &&
				(!(urlObject . hash) || urlObject . hash == '#')) ?
					'#!/documents/index.html' : urlObject . hash;
			const realFragmentIndex = (hash . lastIndexOf)(':');
			const realPath = (hash . substring)(2 ,
				realFragmentIndex != -1 ? realFragmentIndex : hash . length);
			const realFragment = realFragmentIndex != -1 ?
				(hash . substring)(realFragmentIndex + 1) : null;
			return({path : realPath , fragment : realFragment});};
		const updateContent = async (oldUrl , newUrl) => {
			const realOldUrl = parseUrl(oldUrl);
			const realNewUrl = parseUrl(newUrl);
			if(realOldUrl . path == realNewUrl . path &&
				realOldUrl . fragment != realNewUrl . fragment){
					if(realNewUrl . fragment){
						((document . getElementById)(
							realNewUrl . fragment) . scrollIntoView)();}
					else{
						scrollTo(0 , 0);};
					return;};
			let content = null;
			try{
				[, content] = await((Promise . all)([
					clearContent() , fetchContent(realNewUrl . path)]));}
			catch(error){
				content = makeErrorContent(error . message);};
			await(displayContent(content , realNewUrl . fragment));};
		(window . addEventListener)('hashchange' , async (event) => {
			await(updateContent(event . oldURL , event . newURL));});
		const hookHeaderLink = (link) => {
			(link . addEventListener)('click' , async (event) => {
				(event . target . blur)();
				(event . preventDefault)();
				(event . stopPropagation)();
				const hash = (link . hash . startsWith)('#') ? 
					link . hash : '#' + link . hash;
				if(window . location . hash != hash){
					window . location . hash = hash;}
				else{
					await(updateContent(window . location , link . href));};});};	
		hookHeaderLink(title);
		hookHeaderLink(blog);
		await(updateContent(window . location , window . location));
		(main . classList . remove)('loading');})})();

