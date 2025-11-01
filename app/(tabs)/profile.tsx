import { LinearGradient } from 'expo-linear-gradient';
import {
    Bell,
    ChevronRight,
    Edit,
    HelpCircle,
    LogOut,
    Settings,
    Shield,
    User,
} from 'lucide-react-native';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ProfileScreen() {
  const menuItems = [
    { icon: Settings, label: 'Settings', color: '#00d4ff' },
    { icon: Bell, label: 'Notifications', color: '#00ff88' },
    { icon: Shield, label: 'Privacy', color: '#ff00ff' },
    { icon: HelpCircle, label: 'Help & Support', color: '#ffaa00' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0a0a0f', '#1a1a2e', '#0a0a0f']}
        style={styles.gradient}>
        <View style={styles.header}>
          <User size={32} color="#00d4ff" />
          <Text style={styles.title}>Profile</Text>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}>
          <LinearGradient
            colors={['#1a1a2e', '#16213e']}
            style={styles.profileCard}>
            <LinearGradient
              colors={['#00d4ff', '#0099cc']}
              style={styles.avatar}>
              <Text style={styles.avatarText}>JD</Text>
            </LinearGradient>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.email}>john.doe@example.com</Text>

            <TouchableOpacity>
              <LinearGradient
                colors={['#00d4ff', '#0099cc']}
                style={styles.editButton}>
                <Edit size={16} color="#fff" />
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={['#1a1a2e', '#16213e']}
            style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Quizzes</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1,847</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Streak</Text>
            </View>
          </LinearGradient>

          <View style={styles.menuSection}>
            <Text style={styles.menuTitle}>Account Settings</Text>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity key={index}>
                  <LinearGradient
                    colors={['#1a1a2e', '#16213e']}
                    style={styles.menuItem}>
                    <View style={styles.menuItemLeft}>
                      <View
                        style={[
                          styles.menuIconContainer,
                          { backgroundColor: `${item.color}20` },
                        ]}>
                        <Icon size={20} color={item.color} />
                      </View>
                      <Text style={styles.menuItemText}>{item.label}</Text>
                    </View>
                    <ChevronRight size={20} color="#666" />
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.menuSection}>
            <Text style={styles.menuTitle}>Preferences</Text>
            <TouchableOpacity>
              <LinearGradient
                colors={['#1a1a2e', '#16213e']}
                style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Text style={styles.menuItemText}>Dark Mode</Text>
                </View>
                <View style={styles.toggle}>
                  <View style={styles.toggleActive} />
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity>
              <LinearGradient
                colors={['#1a1a2e', '#16213e']}
                style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Text style={styles.menuItemText}>Sound Effects</Text>
                </View>
                <View style={styles.toggle}>
                  <View style={styles.toggleActive} />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <LinearGradient
              colors={['#ff4444', '#cc0000']}
              style={styles.logoutButton}>
              <LogOut size={20} color="#fff" />
              <Text style={styles.logoutButtonText}>Log Out</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.version}>Version 1.0.0</Text>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginTop: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  profileCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    gap: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  statsCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#00d4ff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#2a2a3e',
  },
  menuSection: {
    marginBottom: 24,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#00d4ff',
    justifyContent: 'center',
    paddingHorizontal: 2,
    alignItems: 'flex-end',
  },
  toggleActive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 16,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  version: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  bottomSpacing: {
    height: 40,
  },
});
