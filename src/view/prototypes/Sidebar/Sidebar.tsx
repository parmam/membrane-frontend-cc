import { useI18n } from '@/i18n';

import { FunctionComponent, useState } from 'react';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import useTheme from '@theme/useTheme';
import Box from '@view/elements/Box';
import Icon from '@view/elements/Icon';
import Typography from '@view/elements/Typography';
import clsx from 'clsx';

import styles from './Sidebar.module.css';
import { SidebarItemGroup, sidebarItemGroups, sidebarItems } from './model';

const Sidebar: FunctionComponent = () => {
  const { t } = useI18n();
  const theme = useTheme();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(sidebarItemGroups.map((group) => [group.id, group.expanded || false])),
  );

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  return (
    <Box className={styles.sidebar}>
      <Box flexDirection='column' className={styles.menuContainer}>
        {sidebarItems.map((item) => {
          const isActive = item.active || false;
          return (
            <div
              key={item.id}
              className={clsx(styles.menuItem, { [styles.menuItemActive]: isActive })}
            >
              <Box className={styles.menuItemIcon}>
                <Icon icon={item.icon} color='inherit' />
              </Box>
              <Typography variant='body2' color='inherit'>
                {item.label}
              </Typography>
            </div>
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
                  {group.label}
                </Typography>
                <Icon icon={faChevronDown} className={styles.expandIcon} color='inherit' />
              </Box>
            </div>

            {expandedGroups[group.id] && (
              <Box className={styles.submenu} flexDirection='column'>
                {group.items.map((item) => (
                  <div key={item.id} className={styles.submenuItem}>
                    <Box className={styles.menuItemIcon}>
                      <Icon icon={item.icon} color='inherit' />
                    </Box>
                    <Typography variant='body2' color='inherit'>
                      {item.label}
                    </Typography>
                  </div>
                ))}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
