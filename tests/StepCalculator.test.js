// import getSpikesFromAccelerometer from '../utils/StepCalculator';
// import {createObjectCsvWriter} from 'csv-writer';

// it ("Should Show 60 Steps Taken", ()=>{


// let steps = [];
// let previousValue = 0;//we process every 20 measurements, and this will be the 20th measurement from the last time we processed    
// let previousHighPointTime = 0; //this is the most recent time we had a spike in acceleration, we initialize it to 0 meaning none
// let spikes = [];//these are the readings where a local max is reached of acceleration over time, and where the local maximum is at least 400 milliseconds after the previous local maximum
// let wasGoingUp = false;//in the last round of data we evaluated, was the last reading higher than the previous (trending up)?

// //every 20 readings the StepCalculator is called, below are the sample readings:
// const accelerometerReadings = [];
// accelerometerReadings.push([{"time":1642432150592,"value":10.926566627183444},{"time":1642432150692,"value":9.783876710009872},{"time":1642432150798,"value":9.848971031894301},{"time":1642432150893,"value":10.327328756920595},{"time":1642432150996,"value":9.72640378365322},{"time":1642432151098,"value":9.851349592532884},{"time":1642432151198,"value":9.842948671685805},{"time":1642432151300,"value":9.873699710457274},{"time":1642432151402,"value":9.918690294641015},{"time":1642432151503,"value":9.624931686434401},{"time":1642432151605,"value":9.838581703537448},{"time":1642432151710,"value":9.70962114861672},{"time":1642432151810,"value":9.970092449906867},{"time":1642432151911,"value":10.107875957681307},{"time":1642432152012,"value":9.61153153670953},{"time":1642432152116,"value":9.568734676279933},{"time":1642432152218,"value":9.293869841621234},{"time":1642432152319,"value":9.703826846518956},{"time":1642432152421,"value":10.469988336316174},{"time":1642432152524,"value":10.46754514360329},{"time":1642432152626,"value":9.209202354405384}]);    
// accelerometerReadings.push([{"time":1642432152764,"value":9.412327039574313},{"time":1642432152828,"value":9.337843086956045},{"time":1642432152930,"value":10.798915725452751},{"time":1642432153032,"value":11.621505641366168},{"time":1642432153132,"value":11.513344316503352},{"time":1642432153234,"value":13.351687679248826},{"time":1642432153334,"value":9.569190323074357},{"time":1642432153437,"value":8.655926792081136},{"time":1642432153538,"value":7.927776625282019},{"time":1642432153640,"value":8.784580297491623},{"time":1642432153743,"value":10.210333904802237},{"time":1642432153844,"value":10.165779794631073},{"time":1642432153946,"value":10.25157118106597},{"time":1642432154049,"value":9.290097151688887},{"time":1642432154148,"value":10.7508975356685},{"time":1642432154252,"value":11.941161886493926},{"time":1642432154353,"value":12.327677168573338},{"time":1642432154455,"value":10.408799722727636},{"time":1642432154557,"value":8.613992382774326},{"time":1642432154659,"value":8.815010465203109},{"time":1642432154762,"value":8.391918913592747}]);
// accelerometerReadings.push([{"time":1642432154878,"value":8.743660873298738},{"time":1642432154964,"value":10.36728536291921},{"time":1642432155069,"value":10.419553810159341},{"time":1642432155170,"value":9.37738566694139},{"time":1642432155272,"value":9.572019554673789},{"time":1642432155374,"value":13.36856068548226},{"time":1642432155475,"value":13.183779356881598},{"time":1642432155578,"value":9.294217702530094},{"time":1642432155680,"value":8.741187469802307},{"time":1642432155782,"value":10.06651061074524},{"time":1642432155884,"value":9.715398368014782},{"time":1642432155987,"value":9.22614893471992},{"time":1642432156088,"value":11.976677495555718},{"time":1642432156192,"value":8.533769804861608},{"time":1642432156296,"value":8.6534679389431},{"time":1642432156397,"value":8.70027991214047},{"time":1642432156500,"value":14.452688680865794},{"time":1642432156602,"value":11.541273011616031},{"time":1642432156704,"value":8.710337454423534},{"time":1642432156806,"value":7.4749561275411684},{"time":1642432156908,"value":9.715243272561793}]);
// accelerometerReadings.push([{"time":1642432157073,"value":9.598063517903743},{"time":1642432157112,"value":9.440693930233182},{"time":1642432157215,"value":13.18365879672996},{"time":1642432157316,"value":7.909720389088449},{"time":1642432157418,"value":7.936475793146921},{"time":1642432157522,"value":8.51856434830564},{"time":1642432157624,"value":15.235006907953757},{"time":1642432157726,"value":11.534036292982721},{"time":1642432157828,"value":8.777040521886525},{"time":1642432157931,"value":8.387959723681881},{"time":1642432158031,"value":9.318220788539941},{"time":1642432158132,"value":8.7196917582453},{"time":1642432158234,"value":10.50367476857103},{"time":1642432158334,"value":10.395944992515169},{"time":1642432158435,"value":8.796630087290566},{"time":1642432158537,"value":8.533848078374398},{"time":1642432158640,"value":9.072940566861426},{"time":1642432158742,"value":15.18530405339553},{"time":1642432158846,"value":12.141088403771631},{"time":1642432158945,"value":10.000685626625485},{"time":1642432159047,"value":7.883599439606823}]);
// accelerometerReadings.push([{"time":1642432159167,"value":9.28587159191496},{"time":1642432159251,"value":8.022656235292898},{"time":1642432159355,"value":10.107339798215406},{"time":1642432159457,"value":10.690724980870186},{"time":1642432159559,"value":9.816578173792964},{"time":1642432159660,"value":9.314033244478928},{"time":1642432159763,"value":9.548381452405211},{"time":1642432159865,"value":15.689800648723843},{"time":1642432159967,"value":11.653383711262242},{"time":1642432160068,"value":10.886995511509884},{"time":1642432160169,"value":7.164939375498766},{"time":1642432160271,"value":7.645535284246847},{"time":1642432160373,"value":8.770625816091059},{"time":1642432160474,"value":10.413995741362939},{"time":1642432160576,"value":9.027664497383784},{"time":1642432160677,"value":10.620703920257187},{"time":1642432160779,"value":9.255603024114704},{"time":1642432160880,"value":9.875440306766603},{"time":1642432160982,"value":12.74244087128141},{"time":1642432161085,"value":13.714091775416016},{"time":1642432161186,"value":11.227236417745281}]);
// accelerometerReadings.push([{"time":1642432161321,"value":7.287227944281625},{"time":1642432161390,"value":8.284031518344353},{"time":1642432161493,"value":8.641877371707189},{"time":1642432161595,"value":9.753260163992659},{"time":1642432161697,"value":7.511381081438179},{"time":1642432161799,"value":11.969154639171743},{"time":1642432161902,"value":8.833797687104752},{"time":1642432162005,"value":8.30000311649636},{"time":1642432162106,"value":8.308376613772616},{"time":1642432162207,"value":16.276052291347035},{"time":1642432162308,"value":12.144756885052438},{"time":1642432162411,"value":8.784018537947674},{"time":1642432162511,"value":7.453262192703823},{"time":1642432162614,"value":8.68157455976913},{"time":1642432162716,"value":8.732205459704232},{"time":1642432162817,"value":9.759149051443336},{"time":1642432162918,"value":10.302243137787851},{"time":1642432163024,"value":9.097782100286368},{"time":1642432163123,"value":9.593866086029703},{"time":1642432163224,"value":11.016303565369586},{"time":1642432163327,"value":14.78800619757927}]);
// accelerometerReadings.push([{"time":1642432163492,"value":11.092676532726577},{"time":1642432163535,"value":10.00156128011564},{"time":1642432163632,"value":8.033828129005569},{"time":1642432163735,"value":7.9521863819161664},{"time":1642432163837,"value":8.540969080580046},{"time":1642432163941,"value":10.876836889747075},{"time":1642432164041,"value":9.892878857745302},{"time":1642432164143,"value":9.096167107815175},{"time":1642432164243,"value":9.134380006180189},{"time":1642432164346,"value":10.591730305926886},{"time":1642432164448,"value":15.787286095448932},{"time":1642432164550,"value":11.909556138909876},{"time":1642432164652,"value":9.092789926387026},{"time":1642432164754,"value":7.529626557257845},{"time":1642432164856,"value":8.19519288537915},{"time":1642432164958,"value":9.744295411095132},{"time":1642432165058,"value":9.16450919796656},{"time":1642432165160,"value":10.250988967620147},{"time":1642432165263,"value":9.666121132991423},{"time":1642432165366,"value":9.452009318518128},{"time":1642432165466,"value":10.868411296828542}]);
// accelerometerReadings.push([{"time":1642432165573,"value":14.44987389011682},{"time":1642432165669,"value":13.365223884657329},{"time":1642432165772,"value":10.308461366009052},{"time":1642432165874,"value":7.504199563066954},{"time":1642432165977,"value":7.995094956179692},{"time":1642432166079,"value":8.98168640676489},{"time":1642432166181,"value":9.519002956050285},{"time":1642432166282,"value":10.856581070332272},{"time":1642432166385,"value":9.04236938836318},{"time":1642432166488,"value":8.229767965032178},{"time":1642432166590,"value":10.05041145766199},{"time":1642432166692,"value":15.683533582700095},{"time":1642432166794,"value":11.888552980027674},{"time":1642432166896,"value":10.79884522876825},{"time":1642432166995,"value":9.42358158517305},{"time":1642432167098,"value":6.296597616483163},{"time":1642432167198,"value":9.258311070778754},{"time":1642432167300,"value":9.845127976184449},{"time":1642432167403,"value":12.009686190777739},{"time":1642432167506,"value":9.23593451847736},{"time":1642432167609,"value":7.375760862389543}]);
// accelerometerReadings.push([{"time":1642432167775,"value":9.312800972257525},{"time":1642432167809,"value":19.080623578709286},{"time":1642432167913,"value":11.469590580509147},{"time":1642432168016,"value":9.517750334533298},{"time":1642432168117,"value":6.512703008203197},{"time":1642432168219,"value":8.76963740883169},{"time":1642432168322,"value":9.198041815273188},{"time":1642432168423,"value":10.39158351747826},{"time":1642432168524,"value":9.631769473830495},{"time":1642432168625,"value":9.849508589997535},{"time":1642432168726,"value":8.514992793069938},{"time":1642432168828,"value":10.662024698033962},{"time":1642432168930,"value":13.053016692612564},{"time":1642432169032,"value":11.856380575712125},{"time":1642432169134,"value":11.997218605848683},{"time":1642432169234,"value":8.409191094925252},{"time":1642432169336,"value":8.137306821782149},{"time":1642432169438,"value":8.245789053207416},{"time":1642432169538,"value":9.399635693124523},{"time":1642432169641,"value":8.702893646230503},{"time":1642432169743,"value":12.368052751027731}]);
// accelerometerReadings.push([{"time":1642432169899,"value":9.291100918326416},{"time":1642432169947,"value":9.756335954318455},{"time":1642432170050,"value":12.396415266814877},{"time":1642432170151,"value":13.916498954429276},{"time":1642432170252,"value":10.719464416071261},{"time":1642432170353,"value":7.849851825942474},{"time":1642432170455,"value":7.378139083122411},{"time":1642432170556,"value":8.392157814741182},{"time":1642432170658,"value":9.857330396898185},{"time":1642432170760,"value":9.412072462246895},{"time":1642432170861,"value":11.924595509478905},{"time":1642432170962,"value":8.223714536532414},{"time":1642432171063,"value":9.490187945691341},{"time":1642432171165,"value":10.860165368488154},{"time":1642432171268,"value":13.399940028129919},{"time":1642432171369,"value":11.87791305713586},{"time":1642432171471,"value":8.161741561026183},{"time":1642432171573,"value":8.090721585288671},{"time":1642432171673,"value":8.116436227475559},{"time":1642432171775,"value":9.83530559419648},{"time":1642432171875,"value":10.544647779372907}]);
// accelerometerReadings.push([{"time":1642432171996,"value":9.091807831554577},{"time":1642432172079,"value":9.651586919776236},{"time":1642432172182,"value":10.116874777387562},{"time":1642432172283,"value":11.464014409517672},{"time":1642432172385,"value":13.333655306514085},{"time":1642432172487,"value":11.867109418196446},{"time":1642432172589,"value":8.242259370062097},{"time":1642432172692,"value":9.373208353585401},{"time":1642432172794,"value":8.413852472999933},{"time":1642432172896,"value":8.685938435871448},{"time":1642432172998,"value":9.11185216630205},{"time":1642432173099,"value":11.336158099696362},{"time":1642432173202,"value":8.961582505086245},{"time":1642432173302,"value":9.188955990756156},{"time":1642432173403,"value":13.260521167677718},{"time":1642432173504,"value":12.29476416204417},{"time":1642432173609,"value":12.13701663638974},{"time":1642432173710,"value":9.556046138806554},{"time":1642432173812,"value":8.95437578123714},{"time":1642432173912,"value":8.085563171304493},{"time":1642432174014,"value":8.053130926305933}]);
// accelerometerReadings.push([{"time":1642432174120,"value":9.176374072065032},{"time":1642432174218,"value":11.55350604482574},{"time":1642432174321,"value":9.637423062271107},{"time":1642432174423,"value":9.951574139133795},{"time":1642432174526,"value":13.601787992443302},{"time":1642432174627,"value":11.86422276560904},{"time":1642432174730,"value":10.430458625144226},{"time":1642432174832,"value":8.246631173199562},{"time":1642432174935,"value":8.605156622406163},{"time":1642432175036,"value":8.25197802190215},{"time":1642432175136,"value":10.533742492785413},{"time":1642432175238,"value":8.019351401129137},{"time":1642432175339,"value":10.593192006467495},{"time":1642432175441,"value":9.860471849744748},{"time":1642432175543,"value":9.453953818131595},{"time":1642432175645,"value":13.546153082094358},{"time":1642432175747,"value":10.578939293415244},{"time":1642432175847,"value":11.673092478998102},{"time":1642432175949,"value":8.208648284161491},{"time":1642432176051,"value":9.20428338087272},{"time":1642432176152,"value":7.678334592073654}]);
// accelerometerReadings.push([{"time":1642432176266,"value":10.35763800247963},{"time":1642432176354,"value":8.66870434839297},{"time":1642432176457,"value":11.654449926428232},{"time":1642432176561,"value":8.366577628414573},{"time":1642432176663,"value":8.217943689694897},{"time":1642432176764,"value":10.377035189418084},{"time":1642432176865,"value":13.11769103524823},{"time":1642432176967,"value":12.41699819491683},{"time":1642432177069,"value":9.063171007153155},{"time":1642432177172,"value":9.91165110077599},{"time":1642432177274,"value":8.08061508679887},{"time":1642432177376,"value":8.542742670510693},{"time":1642432177478,"value":9.293447272786793},{"time":1642432177580,"value":12.223187289870062},{"time":1642432177682,"value":8.43903325011427},{"time":1642432177784,"value":8.226742836149892},{"time":1642432177884,"value":9.863872201626128},{"time":1642432177987,"value":14.053835822837492},{"time":1642432178090,"value":11.964485716413337},{"time":1642432178191,"value":8.100822149611215},{"time":1642432178293,"value":9.307875816068064}]);
// accelerometerReadings.push([{"time":1642432178459,"value":8.049639286063353},{"time":1642432178501,"value":9.632512486755669},{"time":1642432178600,"value":9.332693626588549},{"time":1642432178703,"value":12.1553707571265},{"time":1642432178806,"value":9.005742254501046},{"time":1642432178908,"value":8.898828864785527},{"time":1642432179010,"value":11.57453464931916},{"time":1642432179112,"value":13.530737328410877},{"time":1642432179213,"value":12.462773158680426},{"time":1642432179316,"value":8.597087299352022},{"time":1642432179418,"value":10.545935109534971},{"time":1642432179518,"value":7.559692943440949},{"time":1642432179620,"value":8.363453374297366},{"time":1642432179722,"value":9.302269062390543},{"time":1642432179822,"value":13.980436545420742},{"time":1642432179924,"value":6.50383146340743},{"time":1642432180027,"value":8.296435783258218},{"time":1642432180129,"value":10.644625340102532},{"time":1642432180230,"value":14.126364517980678},{"time":1642432180333,"value":12.376662698063},{"time":1642432180434,"value":8.527582931698033}]);
// accelerometerReadings.push([{"time":1642432180610,"value":7.478724644509631},{"time":1642432180637,"value":7.461098377100321},{"time":1642432180746,"value":9.568394757320833},{"time":1642432180840,"value":9.003285778474186},{"time":1642432180943,"value":12.007980105275065},{"time":1642432181045,"value":8.996093906497237},{"time":1642432181147,"value":7.96548030607206},{"time":1642432181249,"value":10.376864673861048},{"time":1642432181351,"value":18.00237539594888},{"time":1642432181453,"value":13.341741068017008},{"time":1642432181556,"value":8.624444447318458},{"time":1642432181657,"value":6.78919479864962},{"time":1642432181759,"value":8.186404045101634},{"time":1642432181859,"value":9.471381222400016},{"time":1642432181961,"value":9.787369830970567},{"time":1642432182063,"value":8.415170982976461},{"time":1642432182164,"value":11.726747825872025},{"time":1642432182265,"value":8.931658943791149},{"time":1642432182367,"value":9.622477351885612},{"time":1642432182469,"value":14.81937824601665},{"time":1642432182572,"value":13.243050283740144}]);
// accelerometerReadings.push([{"time":1642432182729,"value":10.72156377514051},{"time":1642432182775,"value":8.948899360091977},{"time":1642432182878,"value":6.336627477657256},{"time":1642432182978,"value":8.71549981306813},{"time":1642432183082,"value":10.687947951435701},{"time":1642432183184,"value":9.700050488802061},{"time":1642432183286,"value":10.335953106003585},{"time":1642432183388,"value":9.37400741764133},{"time":1642432183497,"value":10.130259197716185},{"time":1642432183592,"value":15.592553264957903},{"time":1642432183694,"value":12.436116496470266},{"time":1642432183796,"value":10.271697644807869},{"time":1642432183899,"value":8.21644211593979},{"time":1642432184001,"value":8.13688385762525},{"time":1642432184103,"value":8.717935386860587},{"time":1642432184206,"value":9.78739346023723},{"time":1642432184306,"value":10.179117579419849},{"time":1642432184412,"value":12.552465503799406},{"time":1642432184510,"value":8.91080355349791},{"time":1642432184612,"value":9.181999634650916},{"time":1642432184712,"value":13.222314318192494}]);
// accelerometerReadings.push([{"time":1642432184880,"value":12.42394159887942},{"time":1642432184915,"value":11.205143348845725},{"time":1642432185020,"value":8.421025240773409},{"time":1642432185120,"value":10.346208629222684},{"time":1642432185222,"value":7.553806288162612},{"time":1642432185324,"value":9.275670716832957},{"time":1642432185427,"value":9.774249677451607},{"time":1642432185529,"value":11.74667365007606},{"time":1642432185631,"value":8.461907606552776},{"time":1642432185733,"value":9.206666233267304},{"time":1642432185834,"value":8.819454233068456},{"time":1642432185937,"value":16.007496900417596},{"time":1642432186039,"value":12.215091885492225},{"time":1642432186141,"value":10.622115972981241},{"time":1642432186243,"value":7.673834645718369},{"time":1642432186345,"value":7.386640095383668},{"time":1642432186447,"value":8.695946899446941},{"time":1642432186549,"value":9.275519263425211},{"time":1642432186651,"value":13.257152241234916},{"time":1642432186753,"value":12.15541573448971},{"time":1642432186859,"value":9.692722532539106}]);
// accelerometerReadings.push([{"time":1642432187015,"value":8.532964076634846},{"time":1642432187057,"value":8.238032446809614},{"time":1642432187160,"value":10.329273186719663},{"time":1642432187263,"value":10.452658647794028},{"time":1642432187365,"value":13.807365771138768},{"time":1642432187465,"value":9.550686826148432}]);

// // const csvWriter = createObjectCsvWriter({
// //     path:'stepdata3.csv',
// //     header: [
// //         {id: 'time', title: 'Timestamp'},
// //         {id: 'value', title: 'Value'},
// //     ]
// // });

// // const singleLevelArrayOfReadings = [].concat.apply([],accelerometerReadings);

// // csvWriter
// //     .writeRecords(singleLevelArrayOfReadings)
// //     .then(() => console.log('Wrote CSV successfully'));

// accelerometerReadings.forEach((recentAccelerationData)=>{
//     console.log("New Previous Value from calling program: "+previousValue);
//     ({spikes, previousHighPointTime, wasGoingUp} = getSpikesFromAccelerometer({recentAccelerationData, threshold:11, previousValue, previousHighPointTime, wasGoingUp}));
//     previousValue = recentAccelerationData[recentAccelerationData.length-1].value;
//     console.log("New Previous High Point Time from calling program: "+previousHighPointTime);
//     steps = steps.concat(spikes);
//     console.log("Steps: "+steps.length);
    
// });


// expect(steps.length).toBe(32);//There were 32 visible in this test data, while only the first 30 were intentional!


// });