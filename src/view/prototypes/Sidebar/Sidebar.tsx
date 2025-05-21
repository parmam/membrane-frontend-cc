import { useI18n } from '@/i18n';

import { FunctionComponent, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import useTheme from '@theme/useTheme';
import Box from '@view/elements/Box';
import Icon from '@view/elements/Icon';
import Typography from '@view/elements/Typography';
import clsx from 'clsx';

import styles from './Sidebar.module.css';
import { SidebarItemGroup, sidebarItemGroups, sidebarItems } from './model';

// Route translations between languages
const routeTranslations: Record<string, Record<string, string>> = {
  en: {
    '/dashboard': '/dashboard',
    '/monitoreo': '/monitoring',
    '/ultimos-estados': '/latest-states',
    '/admin/usuarios': '/admin/users',
    '/admin/roles': '/admin/roles',
    '/admin/sitios': '/admin/sites',
    '/admin/grupos': '/admin/groups',
    '/admin/dispositivos': '/admin/devices',
    '/admin/marcas': '/admin/brands',
    '/admin/modelos': '/admin/models',
    '/admin/firmwares': '/admin/firmwares',
  },
  es: {
    '/dashboard': '/dashboard',
    '/monitoring': '/monitoreo',
    '/latest-states': '/ultimos-estados',
    '/admin/users': '/admin/usuarios',
    '/admin/roles': '/admin/roles',
    '/admin/sites': '/admin/sitios',
    '/admin/groups': '/admin/grupos',
    '/admin/devices': '/admin/dispositivos',
    '/admin/brands': '/admin/marcas',
    '/admin/models': '/admin/modelos',
    '/admin/firmwares': '/admin/firmwares',
  },
};

const Sidebar: FunctionComponent = () => {
  const { t, language } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(sidebarItemGroups.map((group) => [group.id, group.expanded || false])),
  );
  const [prevLanguage, setPrevLanguage] = useState(language);

  // Handle language change to update route
  useEffect(() => {
    if (prevLanguage !== language && location.pathname !== '/') {
      // Get the translated path for the current route
      const currentPath = location.pathname;
      const translatedPath = getLocalizedPath(currentPath);

      if (translatedPath !== currentPath) {
        navigate(translatedPath);
      }

      setPrevLanguage(language);
    }
  }, [language, location.pathname, navigate, prevLanguage]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  // Function to get localized path based on the current language
  const getLocalizedPath = (path: string): string => {
    if (path === '/') return '/';

    // Look for direct translation of the path
    const translations = routeTranslations[language];
    if (translations && translations[path]) {
      return translations[path];
    }

    // If no direct translation found, try to find in the reverse direction
    // (this handles cases where the current URL is already in the target language)
    const otherLanguage = language === 'en' ? 'es' : 'en';
    const reverseTranslations = routeTranslations[otherLanguage];

    for (const [sourcePath, targetPath] of Object.entries(reverseTranslations)) {
      if (targetPath === path) {
        return sourcePath;
      }
    }

    // If no translation found, return original path
    return path;
  };

  return (
    <Box className={styles.sidebar}>
      <Box flexDirection='column' className={styles.menuContainer}>
        {sidebarItems.map((item) => {
          const path = getLocalizedPath(item.path);
          const isActive = location.pathname === path;

          return (
            <NavLink
              key={item.id}
              to={path}
              className={({ isActive }) =>
                clsx(styles.menuItem, { [styles.menuItemActive]: isActive })
              }
            >
              <Box className={styles.menuItemIcon}>
                <Icon icon={item.icon} color='inherit' />
              </Box>
              <Typography variant='body2' color='inherit'>
                {t(item.translationKey)}
              </Typography>
            </NavLink>
          );
        })}

        {sidebarItemGroups.map((group) => (
          <Box key={group.id} flexDirection='column'>
            <div
              className={clsx(styles.menuItem, { [styles.expanded]: expandedGroups[group.id] })}
              onClick={() => toggleGroup(group.id)}
            >
              <Box className={styles.menuItemIcon}>
                <Icon icon={group.icon} color='inherit' />
              </Box>
              <Box
                className={styles.groupHeader}
                flexDirection='row'
                justifyContent='space-between'
                style={{ flex: 1 }}
              >
                <Typography variant='body2' color='inherit'>
                  {t(group.translationKey)}
                </Typography>
                <Icon icon={faChevronDown} className={styles.expandIcon} color='inherit' />
              </Box>
            </div>

            {expandedGroups[group.id] && (
              <Box className={styles.submenu} flexDirection='column'>
                {group.items.map((item) => {
                  const path = getLocalizedPath(item.path);
                  return (
                    <NavLink
                      key={item.id}
                      to={path}
                      className={({ isActive }) =>
                        clsx(styles.submenuItem, { [styles.menuItemActive]: isActive })
                      }
                    >
                      <Box className={styles.menuItemIcon}>
                        <Icon icon={item.icon} color='inherit' />
                      </Box>
                      <Typography variant='body2' color='inherit'>
                        {t(item.translationKey)}
                      </Typography>
                    </NavLink>
                  );
                })}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
