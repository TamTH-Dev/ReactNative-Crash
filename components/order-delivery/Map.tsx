import React, {
  Dispatch,
  forwardRef,
  MutableRefObject,
  SetStateAction,
} from 'react'
import { View, Image } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

import { IGps, IRegion } from '../../types'
import { icons, COLORS, SIZES, GOOGLE_API_KEY } from '../../constants'

function DestinationMarker({ toLocation }: { toLocation: IGps }) {
  return (
    <Marker coordinate={toLocation}>
      <View
        style={{
          height: 40,
          width: 40,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.white,
        }}
      >
        <View
          style={{
            height: 30,
            width: 30,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.primary,
          }}
        >
          <Image
            source={icons.pin}
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.white,
            }}
          />
        </View>
      </View>
    </Marker>
  )
}

function CarIcon({
  fromLocation,
  angle,
}: {
  fromLocation: IGps
  angle: number
}) {
  return (
    <Marker
      coordinate={fromLocation}
      anchor={{ x: 0.5, y: 0.5 }}
      flat={true}
      rotation={angle}
    >
      <Image
        source={icons.car}
        style={{
          width: 40,
          height: 40,
        }}
      />
    </Marker>
  )
}

interface IMapProps {
  fromLocation: IGps | null
  toLocation: IGps | null
  region: IRegion | null
  angle: number
  isReady: boolean
  setAngle: Dispatch<SetStateAction<number>>
  setDuration: Dispatch<SetStateAction<number>>
  setIsReady: Dispatch<SetStateAction<boolean>>
  setFromLocation: Dispatch<SetStateAction<IGps | null>>
  calculateAngle: (coordinates: Array<IGps>) => number
}

const Map = forwardRef<MapView, IMapProps>(
  (
    {
      fromLocation,
      toLocation,
      region,
      angle,
      isReady,
      setAngle,
      setDuration,
      setIsReady,
      setFromLocation,
      calculateAngle,
    },
    ref,
  ) => (
    <View style={{ flex: 1 }}>
      <MapView
        ref={ref}
        provider={PROVIDER_GOOGLE}
        initialRegion={region || undefined}
        style={{ flex: 1 }}
      >
        <MapViewDirections
          origin={fromLocation || undefined}
          destination={toLocation || undefined}
          apikey={GOOGLE_API_KEY}
          strokeWidth={5}
          strokeColor={COLORS.primary}
          optimizeWaypoints={true}
          onReady={result => {
            setDuration(result.duration)

            if (!isReady) {
              // Fit route into maps
              ;(ref as MutableRefObject<MapView>)!.current?.fitToCoordinates(
                result.coordinates,
                {
                  edgePadding: {
                    right: SIZES.width / 20,
                    bottom: SIZES.height / 4,
                    left: SIZES.width / 20,
                    top: SIZES.height / 8,
                  },
                },
              )

              // Reposition the car
              let nextLoc = {
                latitude: result.coordinates[0]['latitude'],
                longitude: result.coordinates[0]['longitude'],
              }

              if (result.coordinates.length >= 2) {
                let angle = calculateAngle(result.coordinates)
                setAngle(angle)
              }

              setFromLocation(nextLoc)
              setIsReady(true)
            }
          }}
        />
        {isReady && fromLocation && toLocation && (
          <>
            <DestinationMarker toLocation={toLocation} />
            <CarIcon angle={angle} fromLocation={fromLocation} />
          </>
        )}
      </MapView>
    </View>
  ),
)

export default Map
