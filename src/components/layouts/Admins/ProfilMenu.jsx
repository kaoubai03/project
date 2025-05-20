import React, { useState, useRef, useEffect } from 'react';
import { UserCog, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import styles from './ProfilMenu.module.css';

const ProfileMenu = ({ admin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const formatDate = (date) => {
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={styles.profileMenuContainer} ref={menuRef}>
      <button className={styles.profileTrigger} onClick={toggleMenu}>
        <div className={styles.adminIcon}>
          <UserCog size={20} />
        </div>
        <span className={styles.adminZone}>Admin Système</span>
        <ChevronDown size={16} className={`${styles.chevron} ${isOpen ? styles.open : ''}`} />
      </button>
      
      {isOpen && (
        <div className={styles.profileDropdown}>
          <div className={styles.profileHeader}>
            <div className={styles.profileAvatar}>
              {admin.name.charAt(0)}
            </div>
            <div className={styles.profileInfo}>
              <h4>{admin.name}</h4>
              <p>{admin.email}</p>
            </div>
          </div>
          
          <div className={styles.profileDetails}>
            <div className={styles.profileDetailItem}>
              <span className={styles.detailLabel}>ID:</span>
              <span className={styles.detailValue}>{admin.id}</span>
            </div>
            <div className={styles.profileDetailItem}>
              <span className={styles.detailLabel}>Dernière connexion:</span>
              <span className={styles.detailValue}>{formatDate(admin.lastLogin)}</span>
            </div>
            <div className={styles.profileDetailItem}>
              <span className={styles.detailLabel}>Statut:</span>
              <span className={`${styles.detailValue} ${styles.statusActive}`}>{admin.status}</span>
            </div>
          </div>
         {/* 
          <div className={styles.profileActions}>
            <button className={styles.profileActionBtn}>
              <User size={16} />
              <span>Mon profil</span>
            </button>
            <button className={styles.profileActionBtn}>
              <Settings size={16} />
              <span>Paramètres</span>
            </button>
            <button className={`${styles.profileActionBtn} ${styles.logout}`}>
              <LogOut size={16} />
              <span>Déconnexion</span>
            </button>
          </div>
          */}
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;