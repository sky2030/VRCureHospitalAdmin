import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { DrawerContent } from "./DrawerContent";

import MainTabScreen from "./MainTabScreen";
import TransactionScreen from "./TransactionScreen";
import SupportScreen from "./SupportScreen";
//import HomeStackScreen from '../starter/RootStack';
import InsertDoctor from "../routes/InsertDoctor";
import DoctorProfile from "../routes/DoctorProfile";
import updateDetails from "../routes/UpdateDoctor";
import ManageConsultation from "../routes/ManageConsultation";
import ManageDepartments from "../routes/InsertDepartment";
import DepartmentDetail from "../routes/DeptDetail";
import UpdateDepartment from "../routes/UpdateDept";
import AddFees from "../routes/Addfees";
import EditHospital from "../routes/EditHospital";
import PrivacyPolicy from "./PrivacyScreens";
import HospitalSpeciality from "./Specialities";
const Drawer = createDrawerNavigator();

const DrawerStackScreen = ({}) => (
  <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
    <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
    <Drawer.Screen name="Contactus" component={SupportScreen} />
    <Drawer.Screen name="Transaction" component={TransactionScreen} />
    <Drawer.Screen name="AddDoctor" component={InsertDoctor} />
    <Drawer.Screen name="DoctorProfile" component={DoctorProfile} />
    <Drawer.Screen name="updateDetails" component={updateDetails} />
    <Drawer.Screen name="Consultation" component={ManageConsultation} />
    <Drawer.Screen name="addDept" component={ManageDepartments} />
    <Drawer.Screen name="deptdetail" component={DepartmentDetail} />
    <Drawer.Screen name="updatedept" component={UpdateDepartment} />
    <Drawer.Screen name="AddFees" component={AddFees} />
    <Drawer.Screen name="EditHospital" component={EditHospital} />
    <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <Drawer.Screen name="speciality" component={HospitalSpeciality} />
  </Drawer.Navigator>
);

export default DrawerStackScreen;
