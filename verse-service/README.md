# WLE Verse Service
Verse Service is a stateless API that uses env keys to return verse text given specific keys.

## About
There is a need to map a unique id (for a verse) to the actual readable text. There are existing APIs available that can retrieve verses by IDs, but they often require API keys or use different querying methods / ids for verses. 

The purpose of the verse service is to form a common API for WLE to use to fetch verses across multiple translations, using a common set of IDs.

## How does it work
The verse service will store "mappings", so given a WLE verse ID and translation ID, the appropriate source for verse text will be accessed, and data returned.

KJV will be used as a fallback if another source cannot be accessed.