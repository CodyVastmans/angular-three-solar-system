export interface Planet {
  id: number;
  name: string;
  description: string;
  radius: number;
  rotation_speed: number;
  orbit_distance: number;
  orbit_speed: number;
  card_values: {
    radius: string;
    orbit_distance: string;
    rotation_period: string;
    orbital_period: string;
  };
  has_clouds?: boolean;
}
