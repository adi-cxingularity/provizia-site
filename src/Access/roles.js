import staff from "../assets/images/StaffAccess.png";
import investor from "../assets/images/InvestorAccess.png";
import borrower from "../assets/images/BorrowerAccess.png";

const roles = [
  {
    title: "Borrower Access",
    desc: "Manage your account and access personalized services.",
    route: "/borrower",
    loginUrl: "https://cx-lending-borrower.web.app/login",
    image: borrower,
  },
  {
    title: "Investor Access",
    desc: "Access exclusive investment opportunities and detailed market insights.",
    route: "/investor",
    loginUrl: "https://cx-lending-syndicate.web.app/login",
    image: investor,
  },
];

export default roles;
