import NoDataView from "./screens/NoDataView"


//===============Network=====================//

//global.BASE = "http://36a016bc5613.ngrok.io"
global.BASE = "https://stage.mconnecthealth.com"
//global.BASE = "https://api.mconnecthealth.com"

global.BASE_PATH = `${BASE}/v1/hospital`
global.BASE_URL = `${BASE_PATH}/`

//===============Alerts======================//
global.Alert_Title = "VRCure"
global.SOMETHING_WENT_WRONG = "Something went wrong"
global.NO_DATA_FOUND = "No Data Found"

//=========Colors======================//
global.PRIMARY_COLOR = "#009387"

//=================Sizes============
global.HEIGHT_ROW = 45
global.NoDataView = NoDataView
global.ELEVATION = Platform.OS == "ios" ? 1 : 3