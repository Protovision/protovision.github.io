# include<stdio.h>
extern int(
	main(
		register int const(argc) , 
		register char const(* restrict const(argv[])))){
	auto size_t(tab_size);
	if(argc == 2){
		auto int const(scanned) = sscanf(argv[1] , "%zd" , & tab_size);
		if(scanned != 1){
			tab_size = 2;}}
	else{
		tab_size = 2;}
	for(;;){
		auto int(c) = fgetc(stdin);
		if(c == EOF){
			break;}
		switch(c){
			case('<'):
				fputs("&lt;" , stdout);
				break;
			case('>'):
				fputs("&gt;" , stdout);
				break;
			case('&'):
				fputs("&amp;" , stdout);
				break;
			case('\"'):
				fputs("&quot;" , stdout);
				break;
			case('\''):
				fputs("&#39;" , stdout);
				break;
			case(' '):
				fputs("&nbsp;" , stdout);
				break;
			case('\t'):
				for(auto size_t(i) = 0 ; i != tab_size ; ++i){
					fputs("&nbsp;" , stdout);}
				break;
			case('\r'):
				break;
			case('\n'):
				fputs("<br>" , stdout);
				break;
			default:
				fputc(c , stdout);
				break;}}
		fflush(stdout);
		return(0);}

