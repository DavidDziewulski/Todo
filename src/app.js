/* Import FontAwesome 
When you want to add icon you have to write this line below 
 import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
 import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
 library.add(faCheck,faTimes );
    dom.watch() ;
 */
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
library.add(faCheck,faTimes );
dom.watch() ;

import './js/main.js';
import './sass/style.sass';

