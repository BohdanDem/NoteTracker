import {Link} from "react-router-dom";
import styles from './Navbar.module.css'
import {AppRoutes} from "../../routing/appRotes";

const Navbar = () => {

    const buttons = [
        {
            label: 'BOARDS LIST',
            route: AppRoutes.BOARDS_LIST
        },
        {
            label: 'BOARD CARDS SECTION',
            route: AppRoutes.BOARD_CARDS_SECTION
        }
    ]

    return (
        <div className={styles.navigation}>
            {buttons.map((btn, index) =>
                <Link key={index} to={btn.route} className={styles.button}>
                    {btn.label}
                </Link>
            )}
        </div>
    );
};

export default Navbar;
