import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import styles from '../styles/admindashboard.module.css';
import CourseEnrollmentChart from '../components/CourseEnrollmentChart';
import CourseDistributionChart from '../components/CourseDistributionChart';
import UserEngagementOverTimeChart from '../components/UserEngagementOverTimeChart';
import EnrollmentDistributionChart from '../components/EnrollmentDistributionChart';
import CourseRatingsChart from '../components/CourseRatingChart';

const AdminPage = () => {
    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h1 className={styles.title}>Admin Engagement Dashboard</h1>
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        {/* <li className={styles.navItem}>
                            <Link className={styles.navLink} to="/admin/course-enrollment">Course Enrollment Counts</Link>
                        </li> */}
                        <li className={styles.navItem}>
                            <Link className={styles.navLink} to="/admin/course-distribution">Course Distribution By Type</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link className={styles.navLink} to="/admin/course-engagement-overtime">User Engagement Over Time</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link className={styles.navLink} to="/admin/enrollment-counts">Enrollment Counts</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link className={styles.navLink} to="/admin/course-ratings">Average Ratings</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="course-enrollment" element={
                        <section className={styles.section}>
                            {/* <h2 className={styles.sectionTitle}>Course Enrollment Counts</h2> */}
                            <CourseEnrollmentChart />
                        </section>
                    } />
                    <Route path="course-distribution" element={
                        <section className={styles.section}>
                            {/* <h2 className={styles.sectionTitle}>Course Distribution By Type</h2> */}
                            <CourseDistributionChart />
                        </section>
                    } />
                    <Route path="course-engagement-overtime" element={
                        <section className={styles.section}>
                            {/* <h2 className={styles.sectionTitle}>User Engagement Over Time</h2> */}
                            <UserEngagementOverTimeChart />
                        </section>
                    } />
                    <Route path="enrollment-counts" element={
                        <section className={styles.section}>
                            {/* <h2 className={styles.sectionTitle}>Enrollment Counts</h2> */}
                            <EnrollmentDistributionChart />
                        </section>
                    } />
                    <Route path="course-ratings" element={
                        <section className={styles.section}>
                            {/* <h2 className={styles.sectionTitle}>Average Ratings</h2> */}
                            <CourseRatingsChart />
                        </section>
                    } />
                    <Route path="*" element={<Navigate to="course-ratings" replace />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminPage;